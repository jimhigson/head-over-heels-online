// NOTE: zx spectrum ran at 50 (or 50.08) frames per second (PAL)

import { zxSpectrumFrameRate } from "@/originalGame";
import { blockSizePx } from "@/sprites/spritePivots";

// original game timed at 5s to move 8 blocks
export const playerWalkSpeedPixPerMs = {
  head: zxSpectrumFrameRate / 1_000, // 1px per frame in original game
  heels: (2 * zxSpectrumFrameRate) / 1_000, // 2px per frame in original game - may also need acceleration
};

export const conveyorSpeedPixPerMs = zxSpectrumFrameRate / 1_000; // 1px per frame in original game;

// original game jumps were 2px per 1/25s frame. Kept things nice and simple and integer-y!
export const originalGameJumpPxPerFrame = 2;

// two pixels per original zx spectrum game frame (25fps)
// NOTE that this is no longer the real jump speed since we now use a parabolic curve
export const originalGameJumpSpeedPixPerMs =
  (originalGameJumpPxPerFrame * zxSpectrumFrameRate) / 1_000;

export const playerJumpHeightPx = {
  // head can jump almost 3 blocks high
  head: blockSizePx.h * 2.5,
  heels: blockSizePx.h,
};

/** 
  acceleration due to gravity while jumping, in m/s²
  setting to zero gives the old, linear jump behaviour. Higher figures mean
  more contrast between initial jump speed and average jump speed
 */
export const jumpG = 0.0002;

export const fallSpeedPixPerMs = {
  head: (blockSizePx.h * 2) / 1000,
  others: originalGameJumpSpeedPixPerMs,
};
