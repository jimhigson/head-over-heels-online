import {
  createAction,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { SpritesheetName } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { clearAllData } from "../clearAllData";

/**
 * what identifies a smoothing of the spritesheet's art: the same inputs always
 * smooth to the same pixels
 */
export type SmoothingInputs = {
  spritesheetName: SpritesheetName;
  /**
   * where the art comes from - an override replaces the art under the same
   * name
   */
  sourceUrl: string;
  /**
   * smoothed pixels per source pixel, on both axes
   */
  smoothUpscale: number;
};

/**
 * a smoothing under way
 */
export type SmoothingInProgress = {
  inputs: SmoothingInputs;
  /**
   * how far through it is, from 0 to 1
   */
  progress: number;
};

export type SmoothingState = {
  /**
   * the smoothing in progress, if any
   */
  inProgress: SmoothingInProgress | undefined;
  /**
   * the smoothing that finished and is still held, whose pixels are ready to
   * be taken
   */
  smoothed: SmoothingInputs | undefined;
  /**
   * smoothings that failed in a row on this device. At
   * {@link maxSmoothingFailures}, smoothing is turned off for good
   */
  failures: number;
};

const initialState: SmoothingState = {
  inProgress: undefined,
  smoothed: undefined,
  failures: 0,
};

/**
 * how many smoothings can fail in a row before smoothing is turned off
 */
export const maxSmoothingFailures = 3;

/**
 * the smoother has started listening, so smooths for the settings as they
 * already are
 */
export const spritesheetSmootherStarted = createAction(
  "smoothing/smootherStarted",
);

/**
 * where smoothing the spritesheet the settings ask for has got to. The pixels
 * are kept outside the store; this says when they can be taken
 */
export const smoothingSlice = createSlice({
  name: "smoothing",
  initialState,
  reducers: {
    smoothingSucceeded(state) {
      state.failures = 0;
    },
    smoothingFailed(state) {
      state.failures++;
    },
    smoothingStarted(
      state,
      { payload: inputs }: PayloadAction<SmoothingInputs>,
    ) {
      state.inProgress = { inputs, progress: 0 };
      // only one smoothing is held at a time, so the last one is gone
      state.smoothed = undefined;
    },
    smoothingProgressed(
      state,
      { payload: { progress } }: PayloadAction<{ progress: number }>,
    ) {
      if (state.inProgress !== undefined) {
        state.inProgress.progress = progress;
      }
    },
    smoothingSettled(
      state,
      {
        payload: { smoothed },
      }: PayloadAction<{
        /**
         * what was smoothed, or undefined if it failed or none was needed
         */
        smoothed: SmoothingInputs | undefined;
      }>,
    ) {
      state.inProgress = undefined;
      if (smoothed !== undefined) {
        state.smoothed = smoothed;
      }
    },
  },
  extraReducers(builder) {
    // the smoothed pixels themselves are forgotten with all the other data
    builder.addCase(clearAllData, () => initialState);
  },
  selectors: {
    selectIsSmoothingInProgress: (state): boolean =>
      state.inProgress !== undefined,
    selectSmoothed: (state) => state.smoothed,
    selectSmoothingInProgress: (state) => state.inProgress,
    /**
     * whether smoothing has failed on this device too often to try again
     */
    selectIsSmoothingFailedMoreThanAllowed: (state): boolean =>
      state.failures >= maxSmoothingFailures,
  },
});

export const {
  smoothingStarted,
  smoothingProgressed,
  smoothingSettled,
  smoothingSucceeded,
  smoothingFailed,
} = smoothingSlice.actions;
export const {
  selectIsSmoothingInProgress,
  selectSmoothed,
  selectSmoothingInProgress,
  selectIsSmoothingFailedMoreThanAllowed,
} = smoothingSlice.selectors;
