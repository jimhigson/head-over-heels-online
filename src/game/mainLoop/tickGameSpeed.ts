import { selectGameSpeed } from "../../store/slices/gameMenus/gameMenusSelectors";
import { type GameRootState } from "../../store/store";
import { type GameState } from "../gameState/GameState";
import { findDyingPlayable } from "../gameState/gameStateSelectors/findDyingPlayable";
import { fadeInOrOutDuration } from "../render/animationTimings";

const deathAnimationFreezeThreshold = 0.1;

/**
 * how much of the death fade plays before the world freezes, in game-speed-scaled
 * ms. The last sliver is never reached, so this is the animation's visible span
 */
export const deathAnimationVisibleDuration =
  fadeInOrOutDuration * (1 - deathAnimationFreezeThreshold);

/**
 * how fast the game world should run this frame, as a multiplier on real time:
 * the player's chosen game speed:
 *
 * * 0 for any dialog (other than the death dialog)
 * * slowed down towards zero while a death animation plays
 */
export const tickGameSpeed = (
  reduxState: GameRootState,
  gameState: GameState,
): number => {
  const [topMenu] = reduxState.gameMenus.openMenus;
  const userGameSpeed = selectGameSpeed(reduxState);

  const dying = findDyingPlayable(gameState);

  if (topMenu === undefined) {
    if (dying !== undefined) {
      dying.item.state.expires = dying.room.roomTime;
    }
    return userGameSpeed;
  }
  if (topMenu.menuId !== "death") {
    return 0;
  }

  if (dying !== undefined) {
    const remainingFraction =
      (dying.expires - dying.room.roomTime) / fadeInOrOutDuration;

    if (remainingFraction > deathAnimationFreezeThreshold) {
      return userGameSpeed * 0.2 * remainingFraction;
    }
  }

  return 0;
};
