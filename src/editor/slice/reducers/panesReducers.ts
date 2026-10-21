import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { keysIter } from "../../../utils/entries";
import { type EditorRoomItemId } from "../../editorTypes";
import {
  type EditorPaneId,
  type EditorPaneRoomSource,
  newEditorPane,
  paneRoomId,
  requirePane,
} from "../EditorPane";
import { type LevelEditorState } from "../levelEditorSlice";

export const panesReducers = {
  /**
   * a room pane mounted. It becomes the active pane if asked to, or if no
   * other pane is
   */
  editorPaneMounted(
    _state,
    {
      payload: {
        paneId,
        roomSource,
        editable,
        activate = false,
        initialSelectedJsonItemIds = [],
      },
    }: PayloadAction<{
      paneId: EditorPaneId;
      roomSource: EditorPaneRoomSource;
      editable: boolean;
      /**
       * what the pane starts with selected, in the room it shows
       */
      initialSelectedJsonItemIds?: EditorRoomItemId[];
      /**
       * make it the active pane, even if another already is - eg for a pane
       * in a modal dialog
       */
      activate?: boolean;
    }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const pane = newEditorPane(roomSource, editable);
    if (initialSelectedJsonItemIds.length > 0) {
      pane.selectedJsonItemIdsByRoom[paneRoomId(state, pane)] =
        initialSelectedJsonItemIds;
    }
    state.panes[paneId] = pane;
    if (activate || state.activePaneId === undefined) {
      state.activePaneId = paneId;
    }
  },

  /**
   * a room pane unmounted. If it was active, another pane (the most recently
   * mounted) takes over
   */
  editorPaneUnmounted(
    _state,
    { payload: paneId }: PayloadAction<EditorPaneId>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    delete state.panes[paneId];
    if (state.activePaneId === paneId) {
      state.activePaneId = keysIter(state.panes).reduce<
        EditorPaneId | undefined
      >((_, otherPaneId) => otherPaneId, undefined);
    }
  },

  /** the user is interacting with a pane, so commands act on it */
  editorPaneActivated(state, { payload: paneId }: PayloadAction<EditorPaneId>) {
    requirePane(state, paneId);
    if (state.activePaneId !== paneId) {
      state.activePaneId = paneId;
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const panesSelectors = {
  selectActivePaneId: (state: LevelEditorState) => state.activePaneId,
} satisfies SliceSelectors<LevelEditorState>;
