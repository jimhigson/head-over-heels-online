import { createSelector } from "@reduxjs/toolkit";
import { produce } from "immer";
import { type ValueOf } from "type-fest";

import { roomVerticalLink } from "../../model/RoomJson";
import { type EditorRootState } from "../../store/store";
import { keysIter, objectEntriesIter } from "../../utils/entries";
import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../editorTypes";
import { type LevelEditorState } from "./levelEditorSlice";

export const selectCursorRoom = (state: LevelEditorState) => state.cursorRoom;

export const selectCursorRoomId = (state: LevelEditorState) =>
  selectCursorRoom(state).roomId;

export const selectCursorSubRoomId = (state: LevelEditorState) =>
  selectCursorRoom(state).subRoomId;

export const selectCurrentRoomJsonFromLevelEditorState = (
  state: LevelEditorState,
) =>
  state.campaignInProgress.rooms[selectCursorRoomId(state)] as EditorRoomJson;

/** the vertical (above/below) link of the current cursor sub-room, if any */
export const selectCursorSubRoomVerticalLink = (
  state: LevelEditorState,
  direction: "above" | "below",
): { room: EditorRoomId; subRoom?: string } | undefined =>
  roomVerticalLink(
    selectCurrentRoomJsonFromLevelEditorState(state),
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

/**
 * the json ids of items that exist only as an uncommitted preview - ie, the
 * item tool's ghost under the cursor, which the room is rendered with but which
 * has not been added to the room proper. Previewed edits to items that already
 * exist (a drag, a nudge) are not in here: those items are still part of the
 * room, just in a different place
 */
export const selectPreviewOnlyJsonItemIds = createSelector(
  [
    (state: EditorRootState) => state.levelEditor.pendingEdits?.edits,
    (state: EditorRootState) =>
      selectCurrentRoomJsonFromLevelEditorState(state.levelEditor),
  ],
  (pendingEdits, committedRoomJson): ReadonlySet<EditorRoomItemId> =>
    new Set(
      keysIter(
        (pendingEdits ?? {}) as Partial<Record<EditorRoomItemId, unknown>>,
      ).filter(
        (jsonItemId) => committedRoomJson.items[jsonItemId] === undefined,
      ),
    ),
);

/** the room the undo history is being scrubbed to, while hovering it */
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

/**
 * gets the current editing room json with temporary previews applied on
 * top of it
 */
export const selectCurrentEditingRoomJsonWithPreviews = createSelector(
  [
    (state: EditorRootState) =>
      selectCurrentRoomJsonFromLevelEditorState(state.levelEditor),
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
