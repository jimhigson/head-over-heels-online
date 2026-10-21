import { applyPreviewedEditsInPlace } from "../applyPreviewedEditsInPlace";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomIdFromLevelEditorState,
} from "../levelEditorSelectors";
import { type LevelEditorState, type NudgeKind } from "../levelEditorSlice";
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
  pushUndoEntryInPlace(
    state,
    selectCursorRoomIdFromLevelEditorState(state),
    pendingEdits.description,
    pendingEdits.timestamp,
  );
  applyPreviewedEditsInPlace(
    selectCurrentCommittedRoomJsonFromLevelEditorState(state),
    pendingEdits.edits,
  );
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
  const origin = state.pendingEdits?.origin;
  if (origin?.type === "nudge" && origin.kind !== continuingKind) {
    commitPendingEditsInPlace(state);
  }
};
