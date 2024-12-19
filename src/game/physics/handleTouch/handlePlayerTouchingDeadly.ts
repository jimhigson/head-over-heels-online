import { fadeInOrOutDuration } from "@/game/render/animationTimings";
import type { CharacterName } from "@/model/modelTypes";
import { shieldDuration } from "../mechanicsConstants";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";
import type { DeadlyItemType } from "../itemPredicates";

/**
 *
 * @returns true if the player lost a life
 */
export function handlePlayerTouchingDeadly<RoomId extends string>({
  gameState,
  movingItem: playableItem,
}: ItemTouchEventByItemType<RoomId, CharacterName, DeadlyItemType | "floor">) {
  if (playableItem.state.action === "death") {
    // player is already showing death animation - do nothing
    return;
  }

  const { shieldCollectedAt } = playableItem.state;
  if (
    shieldCollectedAt !== null &&
    shieldCollectedAt + shieldDuration > gameState.gameTime
  ) {
    // shield - do nothing, do not halt
    return;
  }

  playableItem.state.action = "death";
  playableItem.state.expires = gameState.gameTime + fadeInOrOutDuration;

  return;
}
