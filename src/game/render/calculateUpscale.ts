import { resolutions, type ResolutionName } from "../../originalGame";
import type { Xy } from "../../utils/vectors/vectors";
import { scaleXy } from "../../utils/vectors/vectors";

export type Upscale = {
  cssUpscale: number;
  canvasSize: Xy;

  gameEngineUpscale: number;

  /** the size, in emulated pixels, of the screen available inside the game engine */
  gameEngineScreenSize: Xy;
};

/**
 * The maximum upscale that the game engine will do.
 * Past this upscale, the upscale will be done on the canvas via css
 * This is because on large screens (ie, 4k), the filters in the game can be
 * slow. rendering in third/quarter-pixels is fine.
 */
export const maximumCanvasUpscale = 4;

export const calculateUpscale = (
  /** size of the dom element, window, etc we want to render into */
  renderAreaSize: Xy,
  emulatedResolutionName: ResolutionName,
  devicePixelRatio: number,
): Upscale => {
  const emulatedResolution = resolutions[emulatedResolutionName];

  const devicePixels = scaleXy(renderAreaSize, devicePixelRatio);

  const scaleFactor = Math.floor(
    Math.min(
      devicePixels.x / emulatedResolution.x,
      devicePixels.y / emulatedResolution.y,
    ),
  );
  const gameEngineScreenSize = {
    x: Math.floor(devicePixels.x / scaleFactor),
    y: Math.floor(devicePixels.y / scaleFactor),
  };

  const gameEngineUpscale = Math.min(maximumCanvasUpscale, scaleFactor);
  const cssUpscale = scaleFactor / gameEngineUpscale / devicePixelRatio;

  const canvasSize = {
    x: Math.ceil(renderAreaSize.x / cssUpscale),
    y: Math.ceil(renderAreaSize.y / cssUpscale),
  };

  return {
    gameEngineUpscale,
    cssUpscale,
    gameEngineScreenSize,
    canvasSize,
  };
};
