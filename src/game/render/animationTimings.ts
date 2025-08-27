import type { AnimationId } from "../../sprites/spriteSheetData";

import { spritesheetData } from "../../sprites/spriteSheetData";

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

export const animationDuration = (animationId: AnimationId) => {
  const animationData = spritesheetData.animations[animationId];
  const frameCount = animationData.length;
  const { animationSpeed } = animationData;

  // work out duration based on number of frames and frame rate
  return (frameCount * originalFramePeriod) / animationSpeed;
};

export const pickupAnimationDuration = animationDuration("bubbles.white");
export const fadeInOrOutDuration = animationDuration("head.fadeOut");
