import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { applyPreviewedEditsInPlace } from "../applyPreviewedEditsInPlace";
import { consolidateCurrentRoomInPlace } from "../inPlaceMutators/consolidateCurrentRoomInPlace";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { pushUndoInPlace } from "./undoReducers";

export const itemPreviewReducers = {
  setAutoCoalesce(_state: LevelEditorState, action: PayloadAction<boolean>) {
    _state.autoCoalesce = action.payload;
  },
  resetPreviewedEdits(state) {
    state.previewedEdits = {};
  },
  commitCurrentPreviewedEdits(state) {
    pushUndoInPlace(state);
    applyPreviewedEditsInPlace(
      selectCurrentRoomFromLevelEditorState(state),
      state.previewedEdits,
    );
    if (state.autoCoalesce) {
      consolidateCurrentRoomInPlace(state);
    }

    state.previewedEdits = {};
  },
} satisfies SliceCaseReducers<LevelEditorState>;
