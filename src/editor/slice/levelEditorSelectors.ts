import { createSelector } from "@reduxjs/toolkit";
import { produce } from "immer";
import { type ValueOf } from "type-fest";

import { loadRoom } from "../../game/gameState/loadRoom/loadRoom";
import { floorsRenderExtent } from "../../game/render/room/floorsExtent";
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
} from "../editorTypes";
import { type LevelEditorState } from "./levelEditorSlice";

/**
 * gets the current editing room json with temporary previews applied on
 * top of it
 */
const selectHoveredUndoRoom = (
  state: EditorRootState,
): EditorRoomJson | undefined => {
  const {
    hoveredUndoIndex,
    history,
    currentlyEditing: { roomId },
  } = state.levelEditor;
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
 * Selector that loads the room state with preview edits applied.
 * Memoized so it only recomputes when the room JSON or previews change.
 */
const selectEditorRoomStateWithPreviews = createSelector(
  [selectCurrentEditingRoomJsonWithPreviews],
  (roomJsonWithPreviews): EditorRoomState => {
    return loadRoom({
      roomJson: roomJsonWithPreviews,
      roomPickupsCollected: emptyObject,
      scrollsRead: emptyObject,
      // display heads and heels in their starting rooms:
      isNewGame: true,
      userSettings: emptyUserSettings,
    });
  },
);

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

/**
 * Hook to get the current room state with preview edits applied
 */
export const useEditorRoomStateWithPreviews = selectorHook(
  selectEditorRoomStateWithPreviews,
);

/**
 * Hook to get the current room state with preview edits applied
 */
export const useEditorRoomRenderDimensions = selectorHook(
  selectEditorRoomRenderDimensions,
);
export const selectCurrentRoomFromLevelEditorState = (
  state: LevelEditorState,
) =>
  state.campaignInProgress.rooms[
    state.currentlyEditing.roomId
  ] as EditorRoomJson;

export const selectRoomFromLevelEditorState = (
  state: LevelEditorState,
  roomId: EditorRoomId,
) => state.campaignInProgress.rooms[roomId] as EditorRoomJson | undefined;

export const selectItemInLevelEditorState = (
  state: LevelEditorState,
  itemId: EditorRoomItemId,
  /** if not given, uses the room currently being edited */
  roomId?: EditorRoomId,
) =>
  state.campaignInProgress.rooms[roomId ?? state.currentlyEditing.roomId]
    ?.items[itemId] as EditorJsonItemUnion | undefined;

export const selectItemIsSelectedInLevelEditorState = (
  state: LevelEditorState,
  itemId: EditorRoomItemId,
) => state.selectedJsonItemIds.includes(itemId);
