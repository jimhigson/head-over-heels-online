import { entries, keys } from "../../../utils/entries";
import type { EditorRoomJson } from "../../editorTypes";
import { applyPreviewedEditsInPlace } from "../applyPreviewedEditsInPlace";
import type { LevelEditorState, NudgeKind } from "../levelEditorSlice";
import type { UndoLink } from "../reducers/undoReducers";
import { consolidateCurrentRoomInPlace } from "./consolidateCurrentRoomInPlace";
import { pushUndoEntryInPlace } from "./pushUndoEntryInPlace";

/**
 * commit the pending edits, whatever made them, as one edit
 */
export const commitPendingEditsInPlace = (state: LevelEditorState) => {
  const { pendingEdits } = state;
  if (pendingEdits === undefined) {
    return;
  }
  state.pendingEdits = undefined;
  const editedRoomIds = keys(pendingEdits.edits).filter(
    (roomId) => pendingEdits.edits[roomId] !== undefined,
  );
  // an edit to several rooms undoes in all of them together:
  const link: undefined | UndoLink =
    editedRoomIds.length > 1 ?
      { id: `undoLink-${state.nextIdNumber++}`, roomIds: editedRoomIds }
    : undefined;
  // undo is per room, so each room touched gets its own entry for the edit:
  for (const [roomId, roomEdits] of entries(pendingEdits.edits)) {
    if (roomEdits === undefined) {
      continue;
    }
    pushUndoEntryInPlace(
      state,
      roomId,
      pendingEdits.description,
      pendingEdits.timestamp,
      link,
    );
    applyPreviewedEditsInPlace(
      state.campaignInProgress.rooms[roomId] as EditorRoomJson,
      roomEdits,
    );
  }
  if (state.autoCoalesce) {
    consolidateCurrentRoomInPlace(state);
  }
};

/**
 * commit any nudges still being previewed - nudges build one preview until
 * they pause, so anything else that edits the room, its history, the selection
 * they act on or which room is current, calls this first
 */
export const commitPendingNudgeInPlace = (
  state: LevelEditorState,
  /**
   * the kind of nudge the caller is itself adding to - its preview is left
   * to keep building
   */
  continuingKind?: NudgeKind,
) => {
  const madeBy = state.pendingEdits?.madeBy;
  if (madeBy?.type === "nudge" && madeBy.kind !== continuingKind) {
    commitPendingEditsInPlace(state);
  }
};
