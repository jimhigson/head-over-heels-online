import { createSelector } from "@reduxjs/toolkit";
import { produce } from "immer";
import { useEffect } from "preact/hooks";
import { type ValueOf } from "type-fest";

import { buildRoomJsonDirectionalIndex } from "../../game/gameState/loadRoom/buildRoomJsonDirectionalIndex";
import { loadItemFromJson } from "../../game/gameState/loadRoom/loadItemFromJson";
import { addItemToRoom } from "../../game/gameState/mutators/addItemToRoom";
import { deleteItemFromRoom } from "../../game/gameState/mutators/deleteItemFromRoom";
import {
  roomJsonItemsEntriesIterable,
  roomJsonItemsIterable,
} from "../../model/RoomJson";
import { roomItemsIterable } from "../../model/RoomState";
import { startEditorListening } from "../../store/listenerMiddleware";
import { type EditorRootState, useEditorAppSelector } from "../../store/store";
import { objectEntriesIter } from "../../utils/entries";
import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
  type EditorRoomState,
  type EditorUnionOfAllItemInPlayTypes,
} from "../editorTypes";
import { useEditorRoomStateRefs } from "../RoomEditingArea/EditorRoomStateProvider";
import {
  selectCurrentRoomJsonFromLevelEditorState,
  selectCursorRoomId,
  selectEditorRoomRenderDimensions,
  selectEditorRoomState,
} from "./levelEditorSelectors";
import { loadEditorRoom } from "./loadEditorRoom";

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
    (state) => selectCurrentRoomJsonFromLevelEditorState(state.levelEditor),
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
 * Hook that loads the room state with preview edits applied.
 * This is a stateful hook rather than a pure selector to allow
 * in-place item mutations.
 */
export const useEditorRoomStateWithPreviews = (): EditorRoomState => {
  const roomJsonWithPreviews = useEditorAppSelector(
    selectCurrentEditingRoomJsonWithPreviews,
  );
  const { loadedRoomStateRef, prevRoomJsonWithPreviewsRef } =
    useEditorRoomStateRefs();

  // caching the mutated-in-place room state over committed edits is generally fine,
  // but some items like lightBeams from lamps benefit from a full reload of the room,
  // so on committing edits take it down the slower but more thorough path of creating
  // a new preview, not the quick one shown during editing
  useEffect(() => {
    return startEditorListening({
      predicate(_action, currentState, previousState) {
        const currentCommittedRoomJson =
          selectCurrentRoomJsonFromLevelEditorState(currentState.levelEditor);
        const previousCommittedRoomJson =
          selectCurrentRoomJsonFromLevelEditorState(previousState.levelEditor);

        return currentCommittedRoomJson !== previousCommittedRoomJson;
      },
      effect(_action, { getState }) {
        const latestCommittedRoomJson =
          selectCurrentRoomJsonFromLevelEditorState(getState().levelEditor);

        loadedRoomStateRef.current = loadEditorRoom(latestCommittedRoomJson);
        // assuming there hasn't been time to make any previews yet:
        prevRoomJsonWithPreviewsRef.current = latestCommittedRoomJson;
      },
    });
  });

  // since roomJsonWithPreviews comes from a caching selector, it will be referentially unequal to the
  // previous value if  something has changed. Only mutate the state to match roomJsonWithPreviews in
  // this case:
  if (prevRoomJsonWithPreviewsRef.current !== roomJsonWithPreviews) {
    const prevRoomJsonWithPreviews = prevRoomJsonWithPreviewsRef.current;
    const loadedRoomState = loadedRoomStateRef.current;

    const needsFullReload =
      prevRoomJsonWithPreviews === undefined ||
      loadedRoomState === undefined ||
      loadedRoomState.id !== roomJsonWithPreviews.id ||
      prevRoomJsonWithPreviews.planet !== roomJsonWithPreviews.planet ||
      prevRoomJsonWithPreviews.color !== roomJsonWithPreviews.color;

    if (needsFullReload) {
      // first render or room switch — full load
      loadedRoomStateRef.current = loadEditorRoom(roomJsonWithPreviews);
    } else {
      // mutate roomState in-place (much cheaper than reloading)
      const directionalIndex = buildRoomJsonDirectionalIndex(
        roomJsonItemsIterable(roomJsonWithPreviews),
      );

      const deleteInPlayItemsForJsonId = (jsonItemId: EditorRoomItemId) => {
        for (const existingItem of roomItemsIterable(loadedRoomState.items)) {
          if (existingItem.jsonItemId === jsonItemId) {
            deleteItemFromRoom({ room: loadedRoomState, item: existingItem });
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
            room: loadedRoomState,
            item: newItem as EditorUnionOfAllItemInPlayTypes,
          });
        }
      };

      for (const [id, item] of roomJsonItemsEntriesIterable(
        roomJsonWithPreviews.items,
      )) {
        if (prevRoomJsonWithPreviews.items[id] !== item) {
          const wasAdded = prevRoomJsonWithPreviews.items[id] === undefined;
          if (wasAdded) {
            addInPlayItemsForJsonItem(id, item);
          } else {
            deleteInPlayItemsForJsonId(id);
            addInPlayItemsForJsonItem(id, item);
          }
        }
      }
      for (const [id] of roomJsonItemsEntriesIterable(
        prevRoomJsonWithPreviews.items,
      )) {
        const wasRemoved = roomJsonWithPreviews.items[id] === undefined;
        if (wasRemoved) {
          deleteInPlayItemsForJsonId(id);
        }
      }
    }

    prevRoomJsonWithPreviewsRef.current = roomJsonWithPreviews;
  }

  return loadedRoomStateRef.current!;
};

/**
 * Hook to get the current room state (without preview edits)
 */
export const useEditorRoomState = () =>
  useEditorAppSelector(selectEditorRoomState);

/**
 * Hook to get the current room state with preview edits applied
 */
export const useEditorRoomRenderDimensions = () =>
  useEditorAppSelector(selectEditorRoomRenderDimensions);
