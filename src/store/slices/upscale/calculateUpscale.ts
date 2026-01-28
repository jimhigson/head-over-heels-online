import type { DeviceType } from "../../../utils/detectEnv/detectDeviceType";
import type { Upscale } from "./Upscale";

import { type ResolutionName, resolutions } from "../../../originalGame";
import { detectDeviceType } from "../../../utils/detectEnv/detectDeviceType";
import { scaleXy, type Xy } from "../../../utils/vectors/vectors";

export type CalculateUpscaleOptions = {
  renderAreaSize: Xy;
  emulatedResolutionName: ResolutionName;
  devicePixelRatio: number;
  deviceType?: DeviceType;

  maximumCanvasUpscale: number;
};

export const calculateUpscale = ({
  renderAreaSize,
  emulatedResolutionName,
  devicePixelRatio,
  deviceType = detectDeviceType(),
  /**
   * The maximum upscale that the game engine will do.
   * Past this upscale, the upscale will be done on the canvas via css
   * This is because on large screens (ie, 4k), the filters in the game can be
   * slow. rendering in third/quarter-pixels is fine.
   */
  maximumCanvasUpscale,
}: CalculateUpscaleOptions): Upscale => {
  const emulatedResolution = resolutions[emulatedResolutionName];

  // if screen is in portrait, transpose the render area size to make it effectively landscape
  const { renderAreaSize: landscapeRenderAreaSize, rotate90 } =
    deviceType !== "desktop" && renderAreaSize.x < renderAreaSize.y ?
      {
        renderAreaSize: { x: renderAreaSize.y, y: renderAreaSize.x },
        rotate90: true,
      }
      // everything is fine - do not rotate
    : { renderAreaSize, rotate90: false };

  // hardware pixels: undoing the device pixel ratio scaling
  const hardwarePixels = scaleXy(landscapeRenderAreaSize, devicePixelRatio);

  const totalUpscale = Math.max(
    Math.floor(
      Math.min(
        hardwarePixels.x / emulatedResolution.size.x,
        hardwarePixels.y / emulatedResolution.size.y,
      ),
    ),
    1,
  );

  const gameEngineUpscale = Math.min(maximumCanvasUpscale, totalUpscale);
  const cssUpscale = totalUpscale / gameEngineUpscale / devicePixelRatio;

  const gameEngineScreenSize = {
    x: Math.floor(hardwarePixels.x / totalUpscale),
    y: Math.floor(hardwarePixels.y / totalUpscale),
  };

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
