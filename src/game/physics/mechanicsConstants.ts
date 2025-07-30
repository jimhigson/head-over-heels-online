import type { ItemInPlayType } from "../../model/ItemInPlay";
import type { JsonItemConfig } from "../../model/json/JsonItem";
import type { CharacterName } from "../../model/modelTypes";
import { zxSpectrumFrameRate } from "../../originalGame";
import { blockSizePx } from "../../sprites/spritePivots";
import { wallTileSize } from "../../sprites/textureSizes";

const onePxPerFrameInOriginalGamePxPerMs = zxSpectrumFrameRate / 1000;

export const playerWalkAcceldPixPerMsSq = {
  // keep these the same so long as we are relying on walk distance at the start of
  // the walk to decide if we should turn around on the spot or walk a single pixel
  head: 0.000_15,
  heels: 0.000_15,
};

/**
 * The simulation can't run slower than this rate (80fps) even if the graphics are running
 * slower than this. By keeping the physics on the faster side, issues are avoided such as
 * being able to jump slightly higher at lower frame rates (otherwise some jumps onto platforms
 * are doable at lower frame rates but not at higher ones)
 *
 * The issue is that jumping at lower frame rates, even though the vertical veolcity is reduced
 * by acceleration * deltaMs, (semi-implicit Euler integration) because velocity is applied
 * before the velocity is reduced, lower frame rates still have more time at the greater velocity.
 *
 * 110 Hz ensures 3 sub-ticks per frame at 60fps
 */
export const maxSubTickDeltaMs = 1000 / 110;

/** generally, jumps get (slightly) lower as frame rates increase, and this gets
 * impactful at very high frame rates - limit to 240Hz since this is already at
 * the edge of screen tech (2025) and very fast */
export const maxFps = 240;

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
  // moved at different speeds in original depending on direction:
  //    * orthogonally eg (0,1)
  //    * diagonally in a (1, 1) vector  -
  //    that gives us 1 or √2 px per frame - take the average:
  bubbleRobot: ((Math.SQRT2 + 1) / 2) * onePxPerFrameInOriginalGamePxPerMs,
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

  computerBot: onePxPerFrameInOriginalGamePxPerMs,
  turtle: onePxPerFrameInOriginalGamePxPerMs,
  ball: 2 * onePxPerFrameInOriginalGamePxPerMs,
  firedDoughnut: 2 * onePxPerFrameInOriginalGamePxPerMs,
  movingPlatform: onePxPerFrameInOriginalGamePxPerMs,
  floatingText: onePxPerFrameInOriginalGamePxPerMs,
} satisfies Partial<
  Record<
    | CharacterName
    | ItemInPlayType
    | JsonItemConfig<"monster", string, string>["which"],
    number
  >
>;

// n px per frame in original game;
const pxPerFrameSpeed = (pxPerFrame: number = 1) =>
  (pxPerFrame * zxSpectrumFrameRate) / 1_000;

export const conveyorSpeedPixPerMs = pxPerFrameSpeed();

// original game jumps were 2px per 1/25s frame. Kept things nice and simple and integer-y!
export const originalGameJumpPxPerFrame = 2;

/**
 * as a variable frame rate simulations, we suffer from being able to jump
 * slightly higher than intended, especially at the lowest supported physics
 * tick rate (80Hz).
 *
 * The jumping mechanics takes this number off the target jump height when
 * calculating the initial jump velocity. Since the game was originally created
 * and play-tested without that deduction, we add it back on here to restore
 * to the original playability
 */
export const jumpFudge = 1.1;
export const playerJumpHeightPx = {
  // head can jump almost 3 blocks high
  head: blockSizePx.h * 2.6 + jumpFudge,
  heels: blockSizePx.h + jumpFudge,
};

// original game lift speed was 1px per frame
export const liftSpeed = pxPerFrameSpeed(2);

export const defaultRoomHeightBlocks = 10;

/** how long (in ms) a shield bunny lasts for */
export const shieldDuration = 60_000;

export const originalGameStartingLives = 8;

export const switchCharacterHighlightTime = 750;
/** how long to be invincible for after dying and starting the next life? */
export const afterDeathInvulnerabilityTime = 2_500;
/** how quickly to flash after dying? */
export const afterDeathInvulnerabilityFlashPeriod = 200;
/** how long to flash for, as a fraction of the flash period */
export const afterDeathInvulnerabilityFlashPhaseDuration = 0.15;

/**
 * the deepest recursion in the game can go - ie, the longest chain of
 * items pushing items pushing items
 */
export const maxPushRecursionDepth = 8;

// the height of a wall tile without the width - ie, the height from wall bottom on a x-coord of the sprite
// to the wall-top on the same x-coord column
export const wallHeightPx = wallTileSize.h - wallTileSize.w / 2;

// in practice, walls render details above their height, so give the render height a couple of
// extra pixels:
export const wallRenderHeight = wallHeightPx + 2;
