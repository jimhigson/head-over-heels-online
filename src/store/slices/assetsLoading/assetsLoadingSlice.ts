import { createSlice } from "@reduxjs/toolkit";

import { clearAllData } from "../clearAllData";

export type AssetsLoadingState = {
  count: number;
};

const initialState: AssetsLoadingState = {
  count: 0,
};

/**
 * Slice for tracking game assets loading states that aren't managed by RTK Query
 * (e.g. es6 lazy loading of sprites, sounds, and game code)
 */
export const assetsLoadingSlice = createSlice({
  name: "assetsLoading",
  initialState,
  reducers: {
    assetsLoadingStarted(state) {
      state.count++;
    },
    assetsLoadingFinished(state) {
      state.count = Math.max(0, state.count - 1);
    },
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, () => initialState);
  },
  selectors: {
    selectAssetsLoadingCount(state: AssetsLoadingState) {
      return state.count;
    },
  },
});

export const { assetsLoadingStarted, assetsLoadingFinished } =
  assetsLoadingSlice.actions;
export const { selectAssetsLoadingCount } = assetsLoadingSlice.selectors;
