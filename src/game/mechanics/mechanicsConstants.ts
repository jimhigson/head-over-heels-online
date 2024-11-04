// NOTE: zx spectrum ran at 50 (or 50.08) frames per second (PAL)

import { blockSizePx } from "@/sprites/pixiSpriteSheet";

// original game timed at 5s to move 8 blocks
export const playerSpeedPixPerMs = {
  head: (blockSizePx.w * 8) / 5_000,
  // twice as fast (just a guess - TODO: implement acceleration and measure)
  heels: (blockSizePx.w * 8) / 2_500,
};

export const playerJumpHeight = {
  // head can jump almost 3 blocks high
  head: blockSizePx.h * 3 - 1,
  heels: blockSizePx.h,
};

// TODO: use
export const canChangeDirectionInAir = {
  head: true,
  heels: false,
};
