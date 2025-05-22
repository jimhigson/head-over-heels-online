import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { ValueOf } from "type-fest";
import { resolutions, type ResolutionName } from "../../../originalGame";
import { detectDeviceType } from "../../../utils/detectDeviceType";

import { defaultUserSettings } from "../../defaultUserSettings";
import { type Xy, scaleXy } from "../../../utils/vectors/vectors";
import { upscaleOptionsForCurrentDevice } from "./upscaleOptionsForCurrentDevice";

export type Upscale = {
  cssUpscale: number;
  canvasSize: Xy;

  gameEngineUpscale: number;

  /** the size, in emulated pixels, of the screen available inside the game engine */
  gameEngineScreenSize: Xy;

  rotate90: boolean;
};
/**
 * The maximum upscale that the game engine will do.
 * Past this upscale, the upscale will be done on the canvas via css
 * This is because on large screens (ie, 4k), the filters in the game can be
 * slow. rendering in third/quarter-pixels is fine.
 */

export const maximumCanvasUpscale = 4;

export type CalculateUpscaleOptions = {
  renderAreaSize: Xy;
  emulatedResolutionName: ResolutionName;
  devicePixelRatio: number;
};

const calculateUpscale = ({
  renderAreaSize,
  emulatedResolutionName,
  devicePixelRatio,
}: CalculateUpscaleOptions): Upscale => {
  const emulatedResolution = resolutions[emulatedResolutionName];

  // if screen is in portrait, transpose the render area size to make it effectively landscape
  const { renderAreaSize: landscapeRenderAreaSize, rotate90 } =
    detectDeviceType() !== "desktop" && renderAreaSize.x < renderAreaSize.y ?
      {
        renderAreaSize: { x: renderAreaSize.y, y: renderAreaSize.x },
        rotate90: true,
      }
      // everything is fine - do not rotate
    : { renderAreaSize, rotate90: false };

  const hardwarePixels = scaleXy(landscapeRenderAreaSize, devicePixelRatio);

  const scaleFactor = Math.floor(
    Math.min(
      hardwarePixels.x / emulatedResolution.x,
      hardwarePixels.y / emulatedResolution.y,
    ),
  );
  const gameEngineScreenSize = {
    x: Math.floor(hardwarePixels.x / scaleFactor),
    y: Math.floor(hardwarePixels.y / scaleFactor),
  };

  const gameEngineUpscale = Math.min(maximumCanvasUpscale, scaleFactor);
  const cssUpscale = scaleFactor / gameEngineUpscale / devicePixelRatio;

  const canvasSize = {
    x: Math.ceil(landscapeRenderAreaSize.x / cssUpscale),
    y: Math.ceil(landscapeRenderAreaSize.y / cssUpscale),
  };

  return {
    gameEngineUpscale,
    cssUpscale,
    gameEngineScreenSize,
    canvasSize,
    rotate90,
  };
};

export type UpscaleState = {
  upscale: Upscale;
};

export const initialUpscaleSliceState: UpscaleState = {
  upscale: calculateUpscale(
    upscaleOptionsForCurrentDevice(
      // use the default for initial upscale:
      defaultUserSettings.displaySettings.emulatedResolution,
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
