import { type SliceCaseReducers } from "@reduxjs/toolkit";
import type { LevelEditorState } from "../levelEditorSlice";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSliceSelectors";
import { applyPreviewedEditsInPlace } from "../applyPreviewedEditsInPlace";
import { pushUndoInPlace } from "./undoReducers";

export const itemPreviewReducers = {
  resetPreviewedEdits(state) {
    state.previewedEdits = {};
  },
  commitCurrentPreviewedEdits(state) {
    pushUndoInPlace(state);
    applyPreviewedEditsInPlace(
      selectCurrentRoomFromLevelEditorState(state),
      state.previewedEdits,
    );
    state.previewedEdits = {};
  },
} satisfies SliceCaseReducers<LevelEditorState>;
