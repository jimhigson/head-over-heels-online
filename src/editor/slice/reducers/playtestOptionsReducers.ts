import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { type PlaytestOptions } from "../../PlaytestOptions";
import { type LevelEditorState } from "../levelEditorSlice";

export const playtestOptionsReducers = {
  /** change some of how the campaign is opened to playtest it */
  setPlaytestOptions(
    state,
    { payload }: PayloadAction<Partial<PlaytestOptions>>,
  ) {
    Object.assign(state.playtestOptions, payload);
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const playtestOptionsSelectors = {
  selectPlaytestOptions: (state: LevelEditorState) => state.playtestOptions,
} satisfies SliceSelectors<LevelEditorState>;
