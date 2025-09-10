//# allFunctionsCalledOnLoad
import type { Container } from "pixi.js";

import { roundToNearest } from "../maths/maths";

/**
 * allowing the x/y of the container to be an unrounded fraction often ends up with
 * it being n + 0.5 (where n is an integer) which causes wobbly artifacts on animated sprites
 * if the upscale is not divisible by 2 (ie, upscale of 5, offset by half, gives offset of 2.5)
 * - but rounding to int creates an unsmooth stepping effect when scrolling. Rounding to 1/ scale factor
 * works - it is as smooth as the pixels, and avoids the wobbly artifacts.
 */
export const assignRoundedXy = (
  container: Container,
  x: number,
  y: number,
  gameEngineUpscale: number,
) => {
  const increment = 1 / gameEngineUpscale;
  container.x = roundToNearest(x, increment);
  container.y = roundToNearest(y, increment);
};
