import type { PayloadAction } from "@reduxjs/toolkit";
import type { ValueOf } from "type-fest";

import { createSlice } from "@reduxjs/toolkit";

import type { CalculateUpscaleOptions } from "./calculateUpscale";
import type { Upscale } from "./Upscale";

import { defaultUserSettings } from "../gameMenus/defaultUserSettings";
import { calculateUpscale } from "./calculateUpscale";
import { upscaleOptionsForCurrentDevice } from "./upscaleOptionsForCurrentDevice";

export type UpscaleState = {
  upscale: Upscale;
};

export const initialUpscaleSliceState: UpscaleState = {
  upscale: calculateUpscale(
    upscaleOptionsForCurrentDevice(
      // use the default for initial upscale:
      defaultUserSettings.displaySettings.emulatedResolution,
      defaultUserSettings.displaySettings,
    ),
  ),
};

/**
 * a slice for all the state that is controlled in react-land
 * (most state is controlled in the game itself and not touched here)
 */
export const upscaleSlice = createSlice({
  name: "upscale",
  initialState: initialUpscaleSliceState,
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
  selectors: {
    selectCanvasSize(state) {
      return state.upscale.canvasSize;
    },
    selectGameEngineUpscale(state) {
      return state.upscale.gameEngineUpscale;
    },
    selectGameEngineScreenSize(state) {
      return state.upscale.gameEngineScreenSize;
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

export type UpscaleSliceAction = ReturnType<
  ValueOf<typeof upscaleSlice.actions>
>;

export type UpscaleSliceActionCreator = ValueOf<typeof upscaleSlice.actions>;

export const { upscaleToWindow } = upscaleSlice.actions;
export const {
  selectCanvasSize,
  selectRot90,
  selectUpscale,
  selectGameEngineUpscale,
  selectTotalUpscale,
  selectGameEngineScreenSize,
} = upscaleSlice.selectors;

export const upscaleSliceActions = upscaleSlice.actions;
