import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { type LevelEditorState } from "../levelEditorSlice";

/** a drag of the selected items, rather than of the view */
export type ItemsDrag = "moveItems" | "resizeItems";

export type DragInProgress = "pan" | ItemsDrag;

export const dragToMoveReducers = {
  changeDragInProgress(
    state,
    { payload: dragInProgress }: PayloadAction<DragInProgress | undefined>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we
    // assigned to the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed
    // anyway
    const levelEditorState = state as LevelEditorState;
    levelEditorState.dragInProgress = dragInProgress;
  },
} satisfies SliceCaseReducers<LevelEditorState>;
