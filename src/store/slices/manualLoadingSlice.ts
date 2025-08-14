import { createSlice } from "@reduxjs/toolkit";

export type ManualLoadingState = {
  count: number;
};

const initialState: ManualLoadingState = {
  count: 0,
};

/**
 * Slice for tracking loading states that aren't managed by RTK Query
 * (e.g. es6 lazy loading)
 */
export const manualLoadingSlice = createSlice({
  name: "manualLoading",
  initialState,
  reducers: {
    manualLoadingStarted(state) {
      state.count++;
    },
    manualLoadingFinished(state) {
      state.count = Math.max(0, state.count - 1);
    },
  },
  selectors: {
    selectManualLoadingCount(state: ManualLoadingState) {
      return state.count;
    },
  },
});

export const { manualLoadingStarted, manualLoadingFinished } =
  manualLoadingSlice.actions;
export const { selectManualLoadingCount } = manualLoadingSlice.selectors;
