import { ColorMatrixFilter } from "pixi.js";

/** alpha (0..1) at or above which a pixel becomes solid ink */
const inkAlphaThreshold = 0.7;

/**
 * Ramp slope for the alpha "step". A colour matrix is linear, so a true step is
 * impossible - but a steep enough ramp saturates to a hard on/off when written
 * to the 8-bit render texture. At 255 the 0->1 transition spans a single 8-bit
 * alpha level, so any partial-coverage pixel is pushed fully out of the [0,1]
 * range and clamped by the render-target write (the shader itself does not
 * clamp).
 */
const rampSlope = 255;

/**
 * Binarises the alpha of a white-ink texture on the GPU, replacing a per-pixel
 * canvas readback: pixels with alpha >= {@link inkAlphaThreshold} become opaque
 * white, the rest transparent. This collapses each browser's own text
 * antialiasing to a deterministic pixel-crisp result so one set of snapshot
 * baselines matches Linux, macOS and Windows.
 *
 * RGB is forced to constant white and re-premultiplied by the thresholded alpha
 * (the shader un-premultiplies, applies the matrix, then re-premultiplies), so
 * the output stays premultiplied white with no grey fringe on the ramp pixels.
 */
export const alphaThresholdFilter = new ColorMatrixFilter();
// prettier-ignore
alphaThresholdFilter.matrix = [
  // R = 1 (constant white)
  0, 0, 0, 0, 1,
  // G = 1
  0, 0, 0, 0, 1,
  // B = 1
  0, 0, 0, 0, 1,
  // A = rampSlope * (alpha - inkAlphaThreshold)
  0, 0, 0, rampSlope, -rampSlope * inkAlphaThreshold,
];

// applied while baking text off-screen via renderContainerToTexture, so it must
// not be clipped to the screen viewport (which would crop the text):
alphaThresholdFilter.clipToViewport = false;

// run the pass at the render target's resolution (pixi's default is a fixed 1):
// text rasterised into a larger backing store keeps it, instead of being
// flattened to 1x before the ink is even binarised
alphaThresholdFilter.resolution = "inherit";
