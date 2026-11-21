import type { Xy } from "../../../utils/vectors/vectors";

export type Upscale = {
  /**
   * upscale factor of: how much the game engine should upscale the rendered graphics.
   * This may not get up to the full target size, since it is possible to also upscale
   * the canvas additionally via css
   *
   *
   * ```ts
   *    app.stage.scale = gameEngineUpscale
   * ```
   */
  gameEngineUpscale: number;

  /**
   * The size the game engine should render to inside its stage.
   *
   * The stage is upscaled like:
   * ```ts
   * app.stage.scale = gameEngineUpscale
   * ```
   * ...so this is the size that the game engine should render to *inside* the stage.
   *
   * It is ok that the game is rendering to a small size, since the co-ordinates will be
   * floats, so it will get blown up to a good size on the canvas.
   *
   * If the aspect ratio of the output and emulated resolutions are the same, this will match
   * the emulated resolution.
   */
  gameEngineScreenSize: Xy;

  /**
   * factor of: how much to upscale the canvas via css. This is done because it is cheaper
   * than rendering to more pixels in the game engine
   */
  cssUpscale: number;

  /**
   * the size the <canvas> element that the game is rendered inside of should be given,
   * if setting an explicit size, in pixels
   */
  canvasSize: Xy;

  rotate90: boolean;
};
