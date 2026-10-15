import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

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
