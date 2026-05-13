import type { Ticker } from "pixi.js";

import type { RootState } from "../../store/store";
import type { GameState } from "../gameState/GameState";
import type { PlayableItem } from "../physics/itemPredicates";

import { characterNames } from "../../model/modelTypes";
import { selectGameSpeed } from "../../store/slices/gameMenus/gameMenusSelectors";
import { selectCurrentRoomState } from "../gameState/gameStateSelectors/selectCurrentRoomState";
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

export const tickGameSpeed = (
  ticker: Ticker,
  reduxState: RootState,
  gameState: GameState,
): void => {
  const [topMenu] = reduxState.gameMenus.openMenus;
  const userGameSpeed = selectGameSpeed(reduxState);

  const dying = findDyingPlayable(gameState);

  if (topMenu === undefined) {
    if (dying !== undefined) {
      dying.item.state.expires = dying.room.roomTime;
    }
    ticker.speed = userGameSpeed;
    return;
  }
  if (topMenu.menuId !== "death") {
    ticker.speed = 0;
    return;
  }

  if (dying !== undefined) {
    const remainingFraction =
      (dying.item.state.expires! - dying.room.roomTime) / fadeInOrOutDuration;

    if (remainingFraction > deathAnimationFreezeThreshold) {
      ticker.speed = userGameSpeed * 0.2 * remainingFraction;
      return;
    }
  }

  ticker.speed = 0;
};
