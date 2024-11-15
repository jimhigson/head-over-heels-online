// NOTE: zx spectrum ran at 50 (or 50.08) frames per second (PAL)

import { zxSpectrumFrameRate } from "@/originalGame";
import { blockSizePx } from "@/sprites/spritePivots";

// original game timed at 5s to move 8 blocks
export const playerWalkSpeedPixPerMs = {
  head: zxSpectrumFrameRate / 1_000, // 1px per frame in original game
  heels: (2 * zxSpectrumFrameRate) / 1_000, // 2px per frame in original game - may also need acceleration
};

export const conveyorSpeedPixPerMs = zxSpectrumFrameRate / 1_000; // 1px per frame in original game;

// two pixels per original zx spectrum game frame (25fps)
export const jumpSpeedPixPerMs = (2 * zxSpectrumFrameRate) / 1_000;

export const playerJumpHeight = {
  // head can jump almost 3 blocks high
  head: blockSizePx.h * 2.5,
  heels: blockSizePx.h,
};

export const fallSpeedPixPerMs = {
  head: (blockSizePx.h * 2) / 1000,
  others: jumpSpeedPixPerMs,
};
