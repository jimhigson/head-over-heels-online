import type { Xy } from "@/utils/vectors/vectors";

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
 * slow. rendering in quarter-pixels is fine.
 */
export const maximumCanvasUpscale = 4;

export const calculateUpscale = (
  /** size of the dom element, window, etc we want to render into */
  renderAreaSize: Xy,
  emulatedScreenSize: Xy,
): Upscale => {
  const scaleFactor = Math.floor(
    Math.min(
      renderAreaSize.x / emulatedScreenSize.x,
      renderAreaSize.y / emulatedScreenSize.y,
    ),
  );
  const gameEngineScreenSize = {
    x: Math.floor(renderAreaSize.x / scaleFactor),
    y: Math.floor(renderAreaSize.y / scaleFactor),
  };

  const gameEngineUpscale = Math.min(maximumCanvasUpscale, scaleFactor);
  const cssUpscale = scaleFactor / gameEngineUpscale;

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
