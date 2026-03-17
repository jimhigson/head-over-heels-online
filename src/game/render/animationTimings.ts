/**
  default animation speed is one frame of animation per twp
  original game frames (ie, 12.5 fps) - this is the rate most original game animations
  seem to run at
*/
export const defaultAnimationSpeed = 0.5;
/**
 * tick interval of the original game 1s/25 = (40ms)
 */
export const originalFramePeriod = 1000 / 25;

/**
 * 3 frames
 * Using the formula: (frameCount * originalFramePeriod) / animationSpeed
 *      (3 * 40) / 0.5
 *    = 120 / 0.5
 *    = 240ms
 */
export const pickupAnimationDuration = 240;
/**
 * 9 frames
 * With animationSpeed = 0.5
 *      (9 * 40) / 0.5
 *    = 360 / 0.5
 *    = 720ms
 */
export const fadeInOrOutDuration = 720;
