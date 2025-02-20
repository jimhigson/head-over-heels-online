import type { ItemInPlayType } from "../../model/ItemInPlay";
import type { JsonItemConfig } from "../../model/json/JsonItem";
import type { CharacterName } from "../../model/modelTypes";
import { zxSpectrumFrameRate } from "../../originalGame";
import type { SceneryName } from "../../sprites/planets";
import { blockSizePx } from "../../sprites/spritePivots";

const onePxPerFrameInOriginalGamePxPerMs = zxSpectrumFrameRate / 1000;

export const playerWalkAcceldPixPerMsSq = {
  // keep these the same so long as we are relying on walk distance at the start of
  // the walk to decide if we should turn around on the spot or walk a single pixel
  head: 0.000_15,
  heels: 0.000_15,
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

export const maxLiftAcc = fallG * 0.35;
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
  // needs to be quite fast, or he is possible to run around using
  // analogue control. This seems to be fast enough.
  emperorsGuardian: Math.SQRT2 * onePxPerFrameInOriginalGamePxPerMs,
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

export const defaultRoomHeightBlocks = 11;

/** how long (in ms) a shield bunny lasts for */
export const shieldDuration = 60_000;

export const veryHighZ = 9999;

export const originalGameStartingLives = 8;
