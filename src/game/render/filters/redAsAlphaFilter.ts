import { ColorMatrixFilter } from "pixi.js";

/**
 * pixijs has the quirk that when using a sprite as a mask, it uses the red channel as the alpha channel.
 * This filter copies the alpha values to the red channel so it can work normally
 */
export const redAsAlphaFilter = new ColorMatrixFilter();
// prettier-ignore
redAsAlphaFilter.matrix = [
  // R = get alpha value
  0, 0, 0, 1, 0,
  // G (unused for masking) = 0 - not used for making but let some through to make easier to recognise item while debugging
  0, 0.3, 0, 0, 0,
  // B (unused for masking) = 0 - not used for making but let some through to make easier to recognise item while debugging
  0, 0, 0.3, 0, 0,
  // A (unused for masking) = copy unchanged but make partially transparent so if shown for debugging can see item below
  0, 0, 0, 1, 0,
];
