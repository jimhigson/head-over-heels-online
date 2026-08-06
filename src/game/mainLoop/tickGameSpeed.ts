import { characterNames } from "../../model/modelTypes";
import { selectGameSpeed } from "../../store/slices/gameMenus/gameMenusSelectors";
import { type GameRootState } from "../../store/store";
import { type GameState } from "../gameState/GameState";
import { selectCurrentRoomState } from "../gameState/gameStateSelectors/selectCurrentRoomState";
import { type PlayableItem } from "../physics/itemPredicates";
import { fadeInOrOutDuration } from "../render/animationTimings";

const deathAnimationFreezeThreshold = 0.1;

const findDyingPlayable = (gameState: GameState) => {
  const room = selectCurrentRoomState(gameState);
  if (room === undefined) {
    return undefined;
  }

  for (const name of characterNames) {
    const item = room.items[name] as PlayableItem | undefined;
    if (
      item !== undefined &&
      item.state.action === "death" &&
      item.state.expires !== null &&
      item.state.expires > room.roomTime
    ) {
      return { item, room };
    }
  }

  return undefined;
};

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
      (dying.item.state.expires! - dying.room.roomTime) / fadeInOrOutDuration;

    if (remainingFraction > deathAnimationFreezeThreshold) {
      return userGameSpeed * 0.2 * remainingFraction;
    }
  }

  return 0;
};
