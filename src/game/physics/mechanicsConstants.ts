// NOTE: zx spectrum ran at 50 (or 50.08) frames per second (PAL)

import { blockSizePx, spriteSheet } from "@/sprites/spriteSheet";
import { teleportAnimationSpeed } from "../render/itemAppearances/animationSpeeds";

// original game timed at 5s to move 8 blocks
export const playerSpeedPixPerMs = {
  head: (blockSizePx.w * 8) / 5_000,
  // twice as fast (just a guess - TODO: implement acceleration and measure)
  heels: (blockSizePx.w * 8) / 2_500,
};

export const jumpSpeedPixPerMs = (blockSizePx.w * 3.5) / 1_000;

export const playerJumpHeight = {
  // head can jump almost 3 blocks high
  head: blockSizePx.h * 2.5,
  heels: blockSizePx.h,
};

// TODO: use
export const canChangeDirectionInAir = {
  head: true,
  heels: false,
};

export const fallSpeedPixPerMs = {
  head: (blockSizePx.h * 2) / 1000,
  others: jumpSpeedPixPerMs,
};

export const originalFrameRate = 1000 / 25;
export const teleportTime =
  // work out duration based on number of frames and frame rate
  (spriteSheet.animations["head.teleport"].length * originalFrameRate) /
  teleportAnimationSpeed;
