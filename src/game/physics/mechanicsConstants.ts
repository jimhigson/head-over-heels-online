// NOTE: zx spectrum ran at 50 (or 50.08) frames per second (PAL)

import { zxSpectrumFrameRate } from "@/originalGame";
import { blockSizePx } from "@/sprites/spritePivots";

export const playerWalkAcceldPixPerMsSq = {
  head: 0.000_1,
  heels: 0.000_2,
};

/** deceleration of playables when input stops */
export const playerWalkStopAccelPixPerMsSq = {
  head: -0.000_15,
  heels: -0.000_4,
};

/**
 * when heels jumps, she instantly gets the max walk speed as the forward
 * vector
 */
export const heelsJumpForwardDecel = -0.000_06;
/** when head is gliding his ability to change direction mid-air is less */
export const headsGlideAcel = 0.000_04;

// original game timed at 5s to move 8 blocks
export const playerWalkTerminalSpeedPixPerMs = {
  head: zxSpectrumFrameRate / 1_000, // 1px per frame in original game
  heels: (2 * zxSpectrumFrameRate) / 1_000, // 2px per frame in original game - may also need acceleration
};

// n px per frame in original game;
const pxPerFrameSpeed = (pxPerFrame: number = 1) =>
  (pxPerFrame * zxSpectrumFrameRate) / 1_000;

export const conveyorSpeedPixPerMs = pxPerFrameSpeed();

// original game jumps were 2px per 1/25s frame. Kept things nice and simple and integer-y!
export const originalGameJumpPxPerFrame = 2;

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
export const fallG = 0.0002;

export const terminalVelocityPixPerMs = {
  // head glides at height of two blocks per second
  head: (blockSizePx.h * 2) / 1000,
  // everyone else tops out at 2px/sec in original game
  //others: pxPerFrameSpeed(-2),
  others: (blockSizePx.h * 6) / 1000,
};

// original game lift speed was 1px per frame
export const liftSpeed = pxPerFrameSpeed(2);

export const roomHeightBlocks = 9;

/**
 * lifts need to go down visually into the ground a bit, or they are too difficult to jump onto
 * if at the bottom of their cycle they only touch the ground. Their bbs are reduced vertically
 * by this amount so they fly lower
 */
export const liftBBShortening = 2;
