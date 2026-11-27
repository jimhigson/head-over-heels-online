import type { Aabb, Xyz } from "../../utils/vectors/vectors";
import { blockSizePx } from "../physics/mechanicsConstants";

/**
 * stretch a single-block-item's box over a `times` repetition:
 * `box + (times - 1) · blockSize` per axis. The box keeps its margin relative
 * to the repeated blocks, so this works for any box - physical aabbs (loaders)
 * and visual overdraw boxes (render-box derivation) alike
 */
export const multiplyBoundingBox = (box: Aabb, times: Xyz): Aabb => ({
  x: box.x + (times.x - 1) * blockSizePx.x,
  y: box.y + (times.y - 1) * blockSizePx.y,
  z: box.z + (times.z - 1) * blockSizePx.z,
});
