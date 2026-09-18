import { type GameState } from "../gameState/GameState";
import { findDyingPlayable } from "../gameState/gameStateSelectors/findDyingPlayable";
import { deathAnimationVisibleDuration } from "../mainLoop/tickGameSpeed";
import { fadeInOrOutDuration } from "./animationTimings";

/**
 * how fast the camera swings once up to speed, in radians per game-speed-scaled
 * ms. Negative is clockwise
 */
const deathCameraSpinRate = -Math.PI / 2 / deathAnimationVisibleDuration / 2;

/**
 * how long the swing takes to come up to speed, in game-speed-scaled ms - about
 * a second of real time, since the death clock starts near a fifth of normal
 */
const deathCameraSpinEaseInMs = 200;

/**
 * the swing's smoothstep ease-in, integrated: how many ms' worth of full-speed
 * swing has been travelled `fraction` of the way through the ease-in
 */
const easedInMsFraction = (fraction: number) =>
  fraction ** 3 - fraction ** 4 / 2;

/**
 * the ms of full-speed swing travelled by `elapsed` - the ease-in spends its
 * first {@link deathCameraSpinEaseInMs} covering only half that much ground
 */
const swungMs = (elapsed: number) =>
  elapsed < deathCameraSpinEaseInMs ?
    deathCameraSpinEaseInMs *
    easedInMsFraction(elapsed / deathCameraSpinEaseInMs)
  : elapsed - deathCameraSpinEaseInMs / 2;

/** the effect a death has on where the camera is placed, while one plays */
export type DeathCameraEffect = {
  /** added to the angle the camera would otherwise be placed at */
  spinRadians: number;
  /**
   * how far to pull the room from where it would otherwise sit towards having
   * the dying character centred on screen, 0..1
   */
  centringFraction: number;
};

const noEffect: DeathCameraEffect = { spinRadians: 0, centringFraction: 0 };

/**
 * where to place the camera relative to wherever it already is, given how far
 * through its fade a dying character is - nothing at all when nobody is dying,
 * so the played angle and scroll are never touched and the effect unwinds
 * itself the moment the death ends.
 *
 * It runs on the game clock, which the death slows asymptotically towards a
 * standstill, so the swing eases off to a crawl as the world settles.
 */
export const deathCameraEffect = (
  gameState: Pick<GameState, "characterRooms" | "currentCharacterName">,
): DeathCameraEffect => {
  const dying = findDyingPlayable(gameState);

  if (dying === undefined) {
    return noEffect;
  }

  const elapsed = fadeInOrOutDuration - (dying.expires - dying.room.roomTime);
  const progress = Math.min(1, elapsed / deathAnimationVisibleDuration);

  return {
    spinRadians: swungMs(elapsed) * deathCameraSpinRate,
    centringFraction: progress,
  };
};
