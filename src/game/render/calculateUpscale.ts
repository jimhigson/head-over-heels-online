import { resolutions, type ResolutionName } from "../../originalGame";
import { detectDeviceType } from "../../utils/detectDeviceType";
import type { Xy } from "../../utils/vectors/vectors";
import { scaleXy } from "../../utils/vectors/vectors";

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

export const calculateUpscale = (
  /** size of the dom element, window, etc we want to render into */
  renderAreaSize: Xy,
  emulatedResolutionName: ResolutionName,
  devicePixelRatio: number,
): Upscale => {
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

const currentScreenSize = () => {
  const deviceType = detectDeviceType();
  return deviceType === "server" ?
      resolutions.zxSpectrum
      // see also: window.visualViewport
      //: window.screen ? { x: window.screen.width, y: window.screen.height }
    : { x: window.innerWidth, y: window.innerHeight };
};

export const calculateUpscaleForCurrentDevice = (
  emulatedResolution: ResolutionName,
) => {
  const deviceType = detectDeviceType();

  return calculateUpscale(
    currentScreenSize(),
    emulatedResolution,
    deviceType === "server" ? 1 : window.devicePixelRatio,
  );
};
