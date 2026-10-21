import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { type LevelEditorState } from "../levelEditorSlice";

export const cmdKSearchReducers = {
  /**
   * set the text typed into the cmd-k menu's search input
   */
  setCmdKSearch(state, { payload: search }: PayloadAction<string>) {
    state.cmdKSearch = search;
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const cmdKSearchSelectors = {
  selectCmdKSearch: (state: LevelEditorState) => state.cmdKSearch,
} satisfies SliceSelectors<LevelEditorState>;
