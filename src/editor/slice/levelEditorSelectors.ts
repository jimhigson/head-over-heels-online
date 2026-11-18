import { createSelector } from "@reduxjs/toolkit";
import nanoEqual from "nano-equal";

import { roomVerticalLink } from "../../model/RoomJson";
import { type EditorRootState } from "../../store/store";
import { emptyArray } from "../../utils/empty";
import { keysIter } from "../../utils/entries";
import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../editorTypes";
import { jsonItemsWithEdits } from "./jsonItemsWithEdits";
import {
  type LevelEditorState,
  type PreviewedRoomItemEdits,
} from "./levelEditorSlice";
import {
  selectActiveCursorRoomEditingOpenRoomFromLevelEditorState,
  selectFrontOpenRoomFromLevelEditorState,
} from "./PaneLayout";

/** whether the campaign being edited differs from as last saved (or loaded) */
export const selectCampaignHasUnsavedChangesFromLevelEditorState = ({
  remoteCampaign,
  campaignInProgress,
}: LevelEditorState) => !nanoEqual(remoteCampaign, campaignInProgress);

/**
 * the cursor room's open room, in the focused pane's front tab
 */
export const selectCursorRoomFromLevelEditorState = (state: LevelEditorState) =>
  selectFrontOpenRoomFromLevelEditorState(state);

export const selectCursorRoomIdFromLevelEditorState = (
  state: LevelEditorState,
) => selectCursorRoomFromLevelEditorState(state).roomId;

export const selectCursorSubRoomIdFromLevelEditorState = (
  state: LevelEditorState,
) => selectCursorRoomFromLevelEditorState(state).subRoomId;

export const selectCurrentCommittedRoomJsonFromLevelEditorState = (
  state: LevelEditorState,
) =>
  state.campaignInProgress.rooms[
    selectCursorRoomIdFromLevelEditorState(state)
  ] as EditorRoomJson;

/** the vertical (above/below) link of the current cursor sub-room, if any */
export const selectCursorSubRoomVerticalLink = (
  state: LevelEditorState,
  direction: "above" | "below",
): { room: EditorRoomId; subRoom?: string } | undefined =>
  roomVerticalLink(
    selectCurrentCommittedRoomJsonFromLevelEditorState(state),
    direction,
    selectCursorSubRoomIdFromLevelEditorState(state),
  );

export const selectRoomFromLevelEditorState = (
  state: LevelEditorState,
  roomId: EditorRoomId,
) => state.campaignInProgress.rooms[roomId] as EditorRoomJson | undefined;

/**
 * whether the room differs from its last saved version (or has never been
 * saved) - memoised per room, on its json and its saved json
 */
export const selectRoomHasUnsavedChangesFromLevelEditorState = createSelector(
  [
    (state: LevelEditorState, roomId: EditorRoomId) =>
      state.remoteCampaign?.rooms[roomId],
    (state: LevelEditorState, roomId: EditorRoomId) =>
      state.campaignInProgress.rooms[roomId],
  ],
  (savedRoom, room): boolean =>
    // untouched rooms keep their identity, so the deep compare is only for edited ones:
    savedRoom !== room && !nanoEqual(savedRoom, room),
);

export const selectItemInLevelEditorState = (
  state: LevelEditorState,
  itemId: EditorRoomItemId,
  /** if not given, uses the cursor room */
  roomId?: EditorRoomId,
) =>
  state.campaignInProgress.rooms[
    roomId ?? selectCursorRoomIdFromLevelEditorState(state)
  ]?.items[itemId] as EditorJsonItemUnion | undefined;

/**
 * the items selected in the cursor room - the selection that commands act on.
 * Empty unless the active open room is the front tab's
 */
export const selectCursorRoomSelectedJsonItemIdsFromLevelEditorState = (
  state: LevelEditorState,
): EditorRoomItemId[] =>
  selectActiveCursorRoomEditingOpenRoomFromLevelEditorState(state)
    ?.selectedJsonItemIds ?? emptyArray;

/**
 * the json ids of items that exist only as an uncommitted preview - ie, the
 * item tool's ghost under the cursor, which the room is rendered with but which
 * has not been added to the room proper. Previewed edits to items that already
 * exist (a drag, a nudge) are not in here: those items are still part of the
 * room, just in a different place
 */
export const selectPreviewOnlyJsonItemIds = createSelector(
  [
    (state: EditorRootState, roomId: EditorRoomId) =>
      selectPendingEditsToRoom(state, roomId),
    (state: EditorRootState, roomId: EditorRoomId) =>
      state.levelEditor.campaignInProgress.rooms[roomId] as EditorRoomJson,
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

/**
 * the pending edits to this room, if they touch it
 */
const selectPendingEditsToRoom = (
  state: EditorRootState,
  roomId: EditorRoomId,
): PreviewedRoomItemEdits | undefined =>
  state.levelEditor.pendingEdits?.edits[roomId];

/** the room the undo history is being scrubbed to, while hovering it */
const selectHoveredUndoRoom = (
  state: EditorRootState,
): EditorRoomJson | undefined => {
  const { hoveredUndoIndex, history } = state.levelEditor;
  const roomId = selectCursorRoomIdFromLevelEditorState(state.levelEditor);
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
 * another room, as hovering the cursor room's undo (or redo) history would
 * leave it: stepped with each hovered step whose link is that room's next
 * step, as undoing (or redoing) to there would. Undefined if none is
 */
const selectLinkedHoveredUndoRoom = (
  state: EditorRootState,
  roomId: EditorRoomId,
): EditorRoomJson | undefined => {
  const { hoveredUndoIndex, history } = state.levelEditor;
  if (hoveredUndoIndex === 0) {
    return undefined;
  }
  const direction = hoveredUndoIndex > 0 ? "undo" : "redo";
  const cursorStack =
    history[selectCursorRoomIdFromLevelEditorState(state.levelEditor)]?.[
      direction
    ] ?? emptyArray;
  const roomStack = history[roomId]?.[direction] ?? emptyArray;

  let roomNextIndex = roomStack.length - 1;
  let previewedRoom: EditorRoomJson | undefined = undefined;
  // the hovered entry is the oldest stepped through:
  for (
    let cursorIndex = cursorStack.length - 1;
    cursorIndex >= Math.abs(hoveredUndoIndex) - 1;
    cursorIndex--
  ) {
    const { link } = cursorStack[cursorIndex];
    const roomEntry = roomStack.at(roomNextIndex);
    if (link !== undefined && roomEntry?.link?.id === link.id) {
      previewedRoom = roomEntry.room;
      roomNextIndex--;
    }
  }
  return previewedRoom;
};

/**
 * a room json with temporary previews on top of it: the undo history being
 * scrubbed to, if any, otherwise the pending edits
 */
const roomJsonWithPreviews = (
  roomJson: EditorRoomJson,
  pendingEdits: PreviewedRoomItemEdits | undefined,
  hoveredUndoRoom: EditorRoomJson | undefined,
): EditorRoomJson => {
  if (hoveredUndoRoom !== undefined) {
    return hoveredUndoRoom;
  }

  if (pendingEdits === undefined) {
    return roomJson;
  }

  return {
    ...roomJson,
    items: jsonItemsWithEdits(roomJson.items, pendingEdits),
  };
};

/**
 * gets the current editing room json with temporary previews applied on
 * top of it
 */
export const selectCurrentEditingRoomJsonWithPreviews = createSelector(
  [
    (state: EditorRootState) =>
      selectCurrentCommittedRoomJsonFromLevelEditorState(state.levelEditor),
    (state: EditorRootState) =>
      selectPendingEditsToRoom(
        state,
        selectCursorRoomIdFromLevelEditorState(state.levelEditor),
      ),
    selectHoveredUndoRoom,
  ],
  roomJsonWithPreviews,
);

/**
 * any room's json with temporary previews on top of it - the pending edits
 * when they are to that room, and the undo history being scrubbed to: the
 * cursor room's, and in any other room the steps linked to it. Undefined for
 * a room no longer in the campaign. Memoised per room
 */
export const selectRoomJsonWithPreviews = createSelector(
  [
    (state: EditorRootState, roomId: EditorRoomId) =>
      state.levelEditor.campaignInProgress.rooms[roomId] as
        EditorRoomJson | undefined,
    selectPendingEditsToRoom,
    (state: EditorRootState, roomId: EditorRoomId) =>
      roomId === selectCursorRoomIdFromLevelEditorState(state.levelEditor) ?
        selectHoveredUndoRoom(state)
      : selectLinkedHoveredUndoRoom(state, roomId),
  ],
  (roomJson, pendingEdits, hoveredUndoRoom): EditorRoomJson | undefined =>
    roomJson === undefined ? undefined : (
      roomJsonWithPreviews(roomJson, pendingEdits, hoveredUndoRoom)
    ),
);
