import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { type Xy } from "../../../utils/vectors/vectors";
import { type LevelEditorState } from "../levelEditorSlice";

/**
 * Clear any open item context menu. Guarded so that immer does not register a
 * state change when there is nothing to clear.
 */
export const clearContextMenuXyInPlace = (state: LevelEditorState) => {
  if (state.contextMenuXy !== undefined) {
    state.contextMenuXy = undefined;
  }
};

export const contextMenuReducers = {
  /**
   * open the item context menu at the given position (scaled pixels, in the
   * room's projected screen space - ie, the same space as PointingAt.scrXy)
   */
  openItemContextMenu(
    state,
    { payload: { scrXy } }: PayloadAction<{ scrXy: Xy }>,
  ) {
    // only show a context menu when there is a selection to provide context for:
    if (state.selectedJsonItemIds.length > 0) {
      state.contextMenuXy = scrXy;
    }
  },
  closeItemContextMenu(state) {
    clearContextMenuXyInPlace(state);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
