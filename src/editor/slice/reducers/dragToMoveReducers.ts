import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import {
  type EditorPaneId,
  requirePane,
  selectActivePaneFromLevelEditorState,
} from "../EditorPane";
import { type LevelEditorState } from "../levelEditorSlice";

/** a drag of the selected items, rather than of the view */
export type ItemsDrag = "moveItems" | "resizeItems";

export type DragInProgress = "pan" | ItemsDrag;

export const dragToMoveReducers = {
  changeDragInProgress(
    state,
    {
      payload: { paneId, dragInProgress },
    }: PayloadAction<{
      paneId: EditorPaneId;
      dragInProgress: DragInProgress | undefined;
    }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we
    // assigned to the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed
    // anyway
    const pane = requirePane(state as LevelEditorState, paneId);
    pane.dragInProgress = dragInProgress;
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const dragToMoveSelectors = {
  selectPaneDragInProgress(state: LevelEditorState, paneId: EditorPaneId) {
    return requirePane(state, paneId).dragInProgress;
  },
  selectActivePaneDragInProgress: (state: LevelEditorState) =>
    selectActivePaneFromLevelEditorState(state)?.dragInProgress,
} satisfies SliceSelectors<LevelEditorState>;
