import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { applyPreviewedEditsInPlace } from "../applyPreviewedEditsInPlace";
import { consolidateCurrentRoomInPlace } from "../inPlaceMutators/consolidateCurrentRoomInPlace";
import { selectCurrentRoomJsonFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { pushUndoInPlace } from "./undoReducers";

export const itemPreviewReducers = {
  setAutoCoalesce(_state: LevelEditorState, action: PayloadAction<boolean>) {
    _state.autoCoalesce = action.payload;
  },
  resetPreviewedEdits(state) {
    state.pendingEdits = undefined;
  },
  /**
   * overwrite the permanent state of the current room by committing the previewed edits
   */
  commitCurrentPreviewedEdits(state) {
    if (state.pendingEdits === undefined) {
      return;
    }
    pushUndoInPlace(
      state,
      state.pendingEdits.description,
      state.pendingEdits.timestamp,
    );
    applyPreviewedEditsInPlace(
      selectCurrentRoomJsonFromLevelEditorState(state),
      state.pendingEdits.edits,
    );
    if (state.autoCoalesce) {
      consolidateCurrentRoomInPlace(state);
    }

    state.pendingEdits = undefined;
  },
} satisfies SliceCaseReducers<LevelEditorState>;
