// NOTE: zx spectrum ran at 50 (or 50.08) frames per second (PAL)

import type { ItemInPlayType } from "@/model/ItemInPlay";
import type { JsonItemConfig } from "@/model/json/JsonItem";
import type { CharacterName } from "@/model/modelTypes";
import { zxSpectrumFrameRate } from "@/originalGame";
import type { SceneryName } from "@/sprites/planets";
import { blockSizePx } from "@/sprites/spritePivots";

const onePxPerFrameInOriginalGamePxPerMs = zxSpectrumFrameRate / 1000;

export const playerWalkAcceldPixPerMsSq = {
  head: 0.000_2,
  heels: 0.000_2,
};

/** deceleration of playables when input stops */
export const playerWalkStopAccelPixPerMsSq = {
  head: 0.000_5,
  heels: 0.000_5,
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

export const maxLiftAcc = fallG * 0.5;
export const maxLiftSpeed = terminalVelocityPixPerMs.others * 0.5;

/**
 * when heels jumps forwards, instantly gets this fraction of her max speed forward,
 * so she isn't jumping straight up
 */
export const heelsJumpForwardSpeedFraction = 0.8;
/**
 * when heels jumps, she instantly gets the max walk speed as the forward
 * vector
 */
export const heelsJumpForwardDecel = 0.001;

export const walkMinSpeedPixPerMs = {
  head: 0.25 * onePxPerFrameInOriginalGamePxPerMs,
  heels: 0.25 * onePxPerFrameInOriginalGamePxPerMs,
};

// original game timed at 5s to move 8 blocks
export const moveSpeedPixPerMs = {
  head: onePxPerFrameInOriginalGamePxPerMs, //
  heels: 2 * onePxPerFrameInOriginalGamePxPerMs,
  charles: onePxPerFrameInOriginalGamePxPerMs,
  // moved diagonally in a (1, 1) vector in original - that gives us √2 px per frame
  dalek: Math.SQRT2 * onePxPerFrameInOriginalGamePxPerMs,
  cyberman: 1 * onePxPerFrameInOriginalGamePxPerMs,
  skiHead: onePxPerFrameInOriginalGamePxPerMs,
  helicopterBug: onePxPerFrameInOriginalGamePxPerMs,
  homingBot: 2 * onePxPerFrameInOriginalGamePxPerMs,
  monkey: onePxPerFrameInOriginalGamePxPerMs,
  elephant: onePxPerFrameInOriginalGamePxPerMs,
  elephantHead: 0,
  emperor: onePxPerFrameInOriginalGamePxPerMs,
  emperorsGuardian: onePxPerFrameInOriginalGamePxPerMs,
  bubbleRobot: onePxPerFrameInOriginalGamePxPerMs,
  computerBot: onePxPerFrameInOriginalGamePxPerMs,
  turtle: onePxPerFrameInOriginalGamePxPerMs,
  ball: 2 * onePxPerFrameInOriginalGamePxPerMs,
  firedDoughnut: 2 * onePxPerFrameInOriginalGamePxPerMs,
  movableBlock: onePxPerFrameInOriginalGamePxPerMs,
} satisfies Partial<
  Record<
    | CharacterName
    | ItemInPlayType
    | JsonItemConfig<"monster", SceneryName, string>["which"],
    number
  >
>;

// n px per frame in original game;
const pxPerFrameSpeed = (pxPerFrame: number = 1) =>
  (pxPerFrame * zxSpectrumFrameRate) / 1_000;

export const conveyorSpeedPixPerMs = pxPerFrameSpeed();

// original game jumps were 2px per 1/25s frame. Kept things nice and simple and integer-y!
export const originalGameJumpPxPerFrame = 2;

export const playerJumpHeightPx = {
  // head can jump almost 3 blocks high
  head: blockSizePx.h * 2.6,
  heels: blockSizePx.h,
};

// original game lift speed was 1px per frame
export const liftSpeed = pxPerFrameSpeed(2);

export const roomHeightBlocks = 11;

/**
 * lifts need to go down visually into the ground a bit, or they are too difficult to jump onto
 * if at the bottom of their cycle they only touch the ground. Their bbs are reduced vertically
 * by this amount so they fly lower
 */
export const liftBBShortening = 2;

/** how long (in ms) a shield bunny lasts for */
export const shieldDuration = 60_000;

export const veryHighZ = 9999;

export const startingLives = 8;
