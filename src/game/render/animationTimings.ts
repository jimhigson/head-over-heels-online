import { spriteSheet } from "@/sprites/spriteSheet";

/**
  default animation speed is one frame of animation per twp
  original game frames (ie, 12.5 fps) - this is the rate most original game animations
  seem to run at
*/
export const defaultAnimationSpeed = 0.5;
/**
 * tick interval of the original game
 */
export const originalFramePeriod = 1000 / 25;

export const animationDuration = (
  frames: number,
  animationSpeed: number = defaultAnimationSpeed,
) => {
  // work out duration based on number of frames and frame rate
  return (frames * originalFramePeriod) / animationSpeed;
};

export const pickupAnimationDuration = animationDuration(
  spriteSheet.animations["bubbles.white"].length,
);
export const characterFadeInOrOutDuration = animationDuration(
  spriteSheet.animations["head.fadeOut"].length,
);
