import { createSelector } from "@reduxjs/toolkit";
import { produce } from "immer";
import { type ValueOf } from "type-fest";

import { buildRoomJsonDirectionalIndex } from "../../game/gameState/loadRoom/buildRoomJsonDirectionalIndex";
import { loadItemFromJson } from "../../game/gameState/loadRoom/loadItemFromJson";
import { loadRoom } from "../../game/gameState/loadRoom/loadRoom";
import { addItemToRoom } from "../../game/gameState/mutators/addItemToRoom";
import { deleteItemFromRoom } from "../../game/gameState/mutators/deleteItemFromRoom";
import { floorsRenderExtent } from "../../game/render/room/floorsExtent";
import {
  roomJsonItemsEntriesIterable,
  roomJsonItemsIterable,
  roomVerticalLink,
} from "../../model/RoomJson";
import { roomItemsIterable } from "../../model/RoomState";
import { useAppSelector } from "../../store/hooks";
import { emptyUserSettings } from "../../store/slices/userSettings/emptyUserSettings";
import { type EditorRootState } from "../../store/store";
import { emptyObject } from "../../utils/empty";
import { objectEntriesIter } from "../../utils/entries";
import { selectorHook } from "../../utils/react/selectorHook";
import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
  type EditorRoomState,
  type EditorUnionOfAllItemInPlayTypes,
} from "../editorTypes";
import { useEditorRoomStateRefs } from "../RoomEditingArea/EditorRoomStateProvider";
import { type LevelEditorState } from "./levelEditorSlice";

/**
 * gets the current editing room json with temporary previews applied on
 * top of it
 */
const selectHoveredUndoRoom = (
  state: EditorRootState,
): EditorRoomJson | undefined => {
  const { hoveredUndoIndex, history } = state.levelEditor;
  const roomId = selectCursorRoomId(state.levelEditor);
  if (hoveredUndoIndex === 0) {
    return undefined;
  }
  const roomHistory = history[roomId];
  if (roomHistory === undefined) {
    throw new Error(
      `hoveredUndoIndex ${hoveredUndoIndex} but no history for room ${roomId}`,
    );
  }
  if (hoveredUndoIndex > 0) {
    const entry = roomHistory.undo[hoveredUndoIndex - 1];
    if (entry === undefined) {
      throw new Error(
        `hoveredUndoIndex ${hoveredUndoIndex} out of bounds for undo stack of length ${roomHistory.undo.length}`,
      );
    }
    return entry.room;
  }
  const entry = roomHistory.redo[-hoveredUndoIndex - 1];
  if (entry === undefined) {
    throw new Error(
      `hoveredUndoIndex ${hoveredUndoIndex} out of bounds for redo stack of length ${roomHistory.redo.length}`,
    );
  }
  return entry.room;
};

const selectCurrentEditingRoomJsonWithPreviews = createSelector(
  [
    (state) => selectCurrentRoomFromLevelEditorState(state.levelEditor),
    (state: EditorRootState) => state.levelEditor.pendingEdits?.edits,
    selectHoveredUndoRoom,
  ],
  (roomJson, pendingEdits, hoveredUndoRoom): EditorRoomJson => {
    if (hoveredUndoRoom !== undefined) {
      return hoveredUndoRoom;
    }

    if (pendingEdits === undefined) {
      return roomJson;
    }

    return produce(roomJson, (draftRoomJson) => {
      const pendingEditsEntryIter = objectEntriesIter(
        pendingEdits as Partial<
          Record<EditorRoomItemId, ValueOf<typeof pendingEdits>>
        >,
      );

      for (const [itemId, itemPreview] of pendingEditsEntryIter) {
        if (itemPreview === null) {
          delete draftRoomJson.items[itemId];
        } else {
          draftRoomJson.items[itemId] = itemPreview;
        }
      }
    });
  },
);

/**
 * Selector that loads the current room state from the JSON.
 * Memoized so it only recomputes when the room JSON changes.
 */
export const selectEditorRoomState = createSelector(
  [(state) => selectCurrentRoomFromLevelEditorState(state.levelEditor)],
  (roomJson): EditorRoomState => {
    return loadRoom({
      roomJson,
      roomPickupsCollected: emptyObject,
      scrollsRead: emptyObject,
      // display heads and heels in their starting rooms:
      isNewGame: true,
      userSettings: emptyUserSettings,
    });
  },
);

/**
 * Hook that loads the room state with preview edits applied.
 * This is a stateful hook rather than a pure selector to allow
 * future optimisation of in-place item mutations.
 */
export const useEditorRoomStateWithPreviews = (): EditorRoomState => {
  const roomJsonWithPreviews = useAppSelector(
    selectCurrentEditingRoomJsonWithPreviews,
  );

  const { roomStateRef, prevRoomJsonRef } = useEditorRoomStateRefs();

  if (prevRoomJsonRef.current !== roomJsonWithPreviews) {
    const prev = prevRoomJsonRef.current;
    const roomState = roomStateRef.current;

    const roomChanged =
      prev === undefined ||
      roomState === undefined ||
      roomState.id !== roomJsonWithPreviews.id ||
      prev.planet !== roomJsonWithPreviews.planet ||
      prev.color !== roomJsonWithPreviews.color;

    if (roomChanged) {
      // first render or room switch — full load
      roomStateRef.current = loadRoom({
        roomJson: roomJsonWithPreviews,
        roomPickupsCollected: emptyObject,
        scrollsRead: emptyObject,
        // display heads and heels in their starting rooms:
        isNewGame: true,
        userSettings: emptyUserSettings,
      });
    } else {
      const directionalIndex = buildRoomJsonDirectionalIndex(
        roomJsonItemsIterable(roomJsonWithPreviews),
      );

      const deleteInPlayItemsForJsonId = (jsonItemId: EditorRoomItemId) => {
        for (const existingItem of roomItemsIterable(roomState.items)) {
          if (existingItem.jsonItemId === jsonItemId) {
            deleteItemFromRoom({ room: roomState, item: existingItem });
          }
        }
      };

      const addInPlayItemsForJsonItem = (
        jsonItemId: EditorRoomItemId,
        jsonItem: EditorJsonItemUnion,
      ) => {
        for (const newItem of loadItemFromJson<EditorRoomId, EditorRoomItemId>(
          jsonItemId,
          jsonItem,
          roomJsonWithPreviews,
          directionalIndex,
        )) {
          addItemToRoom({
            room: roomState,
            item: newItem as EditorUnionOfAllItemInPlayTypes,
          });
        }
      };

      for (const [id, item] of roomJsonItemsEntriesIterable(
        roomJsonWithPreviews.items,
      )) {
        if (prev.items[id] !== item) {
          const wasAdded = prev.items[id] === undefined;
          if (wasAdded) {
            addInPlayItemsForJsonItem(id, item);
          } else {
            deleteInPlayItemsForJsonId(id);
            addInPlayItemsForJsonItem(id, item);
          }
        }
      }
      for (const [id] of roomJsonItemsEntriesIterable(prev.items)) {
        const wasRemoved = roomJsonWithPreviews.items[id] === undefined;
        if (wasRemoved) {
          deleteInPlayItemsForJsonId(id);
        }
      }
    }

    prevRoomJsonRef.current = roomJsonWithPreviews;
  }

  return roomStateRef.current!;
};

export type RenderedRoomDimensions = {
  l: number;
  r: number;
  t: number;
  b: number;
  w: number;
  h: number;
};

export const selectEditorRoomRenderDimensions = createSelector(
  [selectEditorRoomState],
  (editorRoomStateWithPreviews): RenderedRoomDimensions => {
    const {
      floors: { edgeLeftX: l, edgeRightX: r, bottomEdgeY: b },
      allItems: { topEdgeY: t },
    } = floorsRenderExtent(editorRoomStateWithPreviews);
    // simplify to the x/y/w/h rectangle to inform the editor where the rendering is:
    return {
      l,
      r,
      w: r - l,
      b,
      t,
      h: b - t,
    };
  },
);

/**
 * Hook to get the current room state (without preview edits)
 */
export const useEditorRoomState = selectorHook(selectEditorRoomState);

// useEditorRoomStateWithPreviews is exported directly above as a stateful hook

/**
 * Hook to get the current room state with preview edits applied
 */
export const useEditorRoomRenderDimensions = selectorHook(
  selectEditorRoomRenderDimensions,
);
export const selectCursorRoom = (state: LevelEditorState) => state.cursorRoom;

export const selectCursorRoomId = (state: LevelEditorState) =>
  selectCursorRoom(state).roomId;

export const selectCursorSubRoomId = (state: LevelEditorState) =>
  selectCursorRoom(state).subRoomId;

export const selectCurrentRoomFromLevelEditorState = (
  state: LevelEditorState,
) =>
  state.campaignInProgress.rooms[selectCursorRoomId(state)] as EditorRoomJson;

/** the vertical (above/below) link of the current cursor sub-room, if any */
export const selectCursorSubRoomVerticalLink = (
  state: LevelEditorState,
  direction: "above" | "below",
): { room: EditorRoomId; subRoom?: string } | undefined =>
  roomVerticalLink(
    selectCurrentRoomFromLevelEditorState(state),
    direction,
    selectCursorSubRoomId(state),
  );

export const selectRoomFromLevelEditorState = (
  state: LevelEditorState,
  roomId: EditorRoomId,
) => state.campaignInProgress.rooms[roomId] as EditorRoomJson | undefined;

export const selectItemInLevelEditorState = (
  state: LevelEditorState,
  itemId: EditorRoomItemId,
  /** if not given, uses the cursor room */
  roomId?: EditorRoomId,
) =>
  state.campaignInProgress.rooms[roomId ?? selectCursorRoomId(state)]?.items[
    itemId
  ] as EditorJsonItemUnion | undefined;

export const selectItemIsSelectedInLevelEditorState = (
  state: LevelEditorState,
  itemId: EditorRoomItemId,
) => state.selectedJsonItemIds.includes(itemId);
