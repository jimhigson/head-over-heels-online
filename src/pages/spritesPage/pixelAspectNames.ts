export const pixelAspectNames = ["square", "PAL"] as const;
/**
 * the shape of the pixels the sprites are shown with: square, or as a PAL
 * television drew them
 */
export type PixelAspectName = (typeof pixelAspectNames)[number];
