import type { PayloadAction } from "@reduxjs/toolkit";
import { type SliceCaseReducers } from "@reduxjs/toolkit";
import type { LevelEditorState } from "../levelEditorSlice";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSliceSelectors";
import { applyPreviewedEditsInPlace } from "../applyPreviewedEditsInPlace";
import { pushUndoInPlace } from "./undoReducers";
import { consolidateCurrentRoomInPlace } from "../inPlaceMutators/consolidateCurrentRoomInPlace";

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
