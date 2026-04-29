import { createSlice } from "@reduxjs/toolkit";

import { clearAllData } from "../clearAllData";

export type GameAssetsLoadingState = {
  count: number;
};

const initialState: GameAssetsLoadingState = {
  count: 0,
};

/**
 * Slice for tracking game assets loading states that aren't managed by RTK Query
 * (e.g. es6 lazy loading of sprites, sounds, and game code)
 */
export const gameAssetsLoadingSlice = createSlice({
  name: "gameAssetsLoading",
  initialState,
  reducers: {
    gameAssetsLoadingStarted(state) {
      state.count++;
    },
    gameAssetsLoadingFinished(state) {
      state.count = Math.max(0, state.count - 1);
    },
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, () => initialState);
  },
  selectors: {
    selectGameAssetsLoadingCount(state: GameAssetsLoadingState) {
      return state.count;
    },
  },
});

export const { gameAssetsLoadingStarted, gameAssetsLoadingFinished } =
  gameAssetsLoadingSlice.actions;
export const { selectGameAssetsLoadingCount } =
  gameAssetsLoadingSlice.selectors;
