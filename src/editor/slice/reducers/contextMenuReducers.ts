import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { type Xy } from "../../../utils/vectors/vectors";
import {
  type EditorPaneId,
  panesIter,
  requirePane,
  selectPaneSelectedJsonItemIdsFromLevelEditorState,
} from "../EditorPane";
import { type LevelEditorState } from "../levelEditorSlice";

/**
 * Clear any open item context menu, in every pane. Guarded so that immer does
 * not register a state change when there is nothing to clear.
 */
export const clearContextMenuXyInPlace = (state: LevelEditorState) => {
  for (const pane of panesIter(state)) {
    if (pane.contextMenuXy !== undefined) {
      pane.contextMenuXy = undefined;
    }
  }
};

export const contextMenuReducers = {
  /**
   * open the item context menu in a pane at the given position (scaled pixels,
   * in the room's projected screen space - ie, the same space as
   * PointingAt.scrXy)
   */
  openItemContextMenu(
    state,
    {
      payload: { paneId, scrXy },
    }: PayloadAction<{ paneId: EditorPaneId; scrXy: Xy }>,
  ) {
    const pane = requirePane(state, paneId);
    // only show a context menu when there is a selection to provide context for:
    if (
      selectPaneSelectedJsonItemIdsFromLevelEditorState(state, paneId).length >
      0
    ) {
      pane.contextMenuXy = scrXy;
    }
  },
  closeItemContextMenu(state) {
    clearContextMenuXyInPlace(state);
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const contextMenuSelectors = {
  selectPaneContextMenuXy(state: LevelEditorState, paneId: EditorPaneId) {
    const pane = state.panes[paneId];
    // check pane wasn't closed (in case we have a stale paneId reference)
    if (pane === undefined) {
      return undefined;
    }
    return pane.contextMenuXy;
  },
} satisfies SliceSelectors<LevelEditorState>;
