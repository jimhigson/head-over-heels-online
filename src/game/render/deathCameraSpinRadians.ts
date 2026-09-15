import { type GameState } from "../gameState/GameState";
import { findDyingPlayable } from "../gameState/gameStateSelectors/findDyingPlayable";
import { deathAnimationVisibleDuration } from "../mainLoop/tickGameSpeed";
import { fadeInOrOutDuration } from "./animationTimings";

/**
 * how far the camera swings over a whole death fade, in radians. A quarter turn
 * reads as a lurch without disorienting - a bigger sweep crosses more 45°
 * boundaries, and walls pop in and out of hiding at each one
 */
const deathCameraSpinArc = Math.PI / 2;

/** radians per game-speed-scaled ms of death */
const spinRate = deathCameraSpinArc / deathAnimationVisibleDuration;

/**
 * the angle to swing the rendered camera by, on top of wherever it already is.
 * Grows with the dying character's time-since-death and is zero whenever nobody
 * is dying, so the played angle is never touched - this is a render-time effect
 * that unwinds itself the moment the death ends.
 *
 * It accrues on the game clock, which the death slows asymptotically towards a
 * standstill, so the swing eases off to a crawl as the world settles.
 */
export const deathCameraSpinRadians = (gameState: GameState): number => {
  const dying = findDyingPlayable(gameState);

  if (dying === undefined) {
    return 0;
  }

  const elapsed = fadeInOrOutDuration - (dying.expires - dying.room.roomTime);

  return -elapsed * spinRate;
};
