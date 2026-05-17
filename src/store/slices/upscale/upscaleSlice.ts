import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { clearAllData } from "../clearAllData";
import { defaultUserSettings } from "../userSettings/defaultUserSettings";
import {
  calculateUpscale,
  type CalculateUpscaleOptions,
} from "./calculateUpscale";
import { type Upscale } from "./Upscale";
import { upscaleOptionsForCurrentDevice } from "./upscaleOptionsForCurrentDevice";

export type UpscaleState = {
  upscale: Upscale;
};

/**
 * Computes a fresh initial UpscaleState from current window dimensions and
 * default display settings. Called both at slice creation and on
 * `clearAllData`, so the post-reset upscale matches the current viewport
 * rather than whatever was snapshotted at first load.
 */
const computeInitialUpscaleSliceState = (): UpscaleState => ({
  upscale: calculateUpscale(
    upscaleOptionsForCurrentDevice(
      defaultUserSettings.displaySettings.emulatedResolution,
      defaultUserSettings.displaySettings,
    ),
  ),
});

/**
 * a slice for all the state that is controlled in react-land
 * (most state is controlled in the game itself and not touched here)
 */
export const upscaleSlice = createSlice({
  name: "upscale",
  initialState: computeInitialUpscaleSliceState(),
  reducers: {
    upscaleToWindow(
      state,
      {
        payload: calculateUpscaleOptions,
      }: PayloadAction<CalculateUpscaleOptions>,
    ) {
      state.upscale = calculateUpscale(calculateUpscaleOptions);
    },
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, () => computeInitialUpscaleSliceState());
  },
  selectors: {
    selectCanvasSize(state) {
      return state.upscale.canvasSize;
    },
    selectGameEngineUpscale(state) {
      return state.upscale.gameEngineUpscale;
    },
    selectRot90(state) {
      return state.upscale.rotate90;
    },
    selectUpscale(state) {
      return state.upscale;
    },
    selectTotalUpscale({ upscale: { cssUpscale, gameEngineUpscale } }) {
      return cssUpscale * gameEngineUpscale;
    },
  },
});

export const { upscaleToWindow } = upscaleSlice.actions;
export const {
  selectCanvasSize,
  selectRot90,
  selectUpscale,
  selectGameEngineUpscale,
  selectTotalUpscale,
} = upscaleSlice.selectors;
