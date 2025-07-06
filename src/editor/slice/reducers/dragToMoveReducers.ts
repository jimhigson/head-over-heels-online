import type { PayloadAction } from "@reduxjs/toolkit";
import { type SliceCaseReducers } from "@reduxjs/toolkit";
import type { LevelEditorState } from "../levelEditorSlice";

export const dragToMoveReducers = {
  changeDragInProgress(
    state,
    { payload: dragInProgress }: PayloadAction<boolean>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we
    // assigned to the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed
    // anyway
    const levelEditorState = state as LevelEditorState;
    levelEditorState.dragInProgress = dragInProgress;
  },
} satisfies SliceCaseReducers<LevelEditorState>;
