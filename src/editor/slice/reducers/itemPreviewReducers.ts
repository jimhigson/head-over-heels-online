import { type SliceCaseReducers } from "@reduxjs/toolkit";
import type { LevelEditorState } from "../levelEditorSlice";

export const itemPreviewReducers = {
  resetPreviewedEdits(state) {
    state.previewedEdits = {};
  },
} satisfies SliceCaseReducers<LevelEditorState>;
