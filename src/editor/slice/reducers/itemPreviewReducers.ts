import type { PayloadAction } from "@reduxjs/toolkit";

import { type SliceCaseReducers } from "@reduxjs/toolkit";

import type { LevelEditorState } from "../levelEditorSlice";

import { applyPreviewedEditsInPlace } from "../applyPreviewedEditsInPlace";
import { consolidateCurrentRoomInPlace } from "../inPlaceMutators/consolidateCurrentRoomInPlace";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";
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
