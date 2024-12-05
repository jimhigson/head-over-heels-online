import type { GameState } from "@/game/gameState/GameState";
import { fadeInOrOutDuration } from "@/game/render/animationTimings";
import type { PlayableItem } from "../itemPredicates";
import type { CharacterName } from "@/model/modelTypes";
import { shieldDuration } from "../mechanicsConstants";

/**
 *
 * @returns true if the player lost a life
 */
export function handlePlayerTouchingDeadly<RoomId extends string>(
  gameState: GameState<RoomId>,
  playableItem: PlayableItem<CharacterName, RoomId>,
): boolean {
  const { shieldCollectedAt } = playableItem.state;
  if (
    shieldCollectedAt !== null &&
    shieldCollectedAt + shieldDuration > gameState.gameTime
  ) {
    // shield - do nothing, do not halt
    return false;
  }

  playableItem.state.action = "death";
  playableItem.state.expires = gameState.gameTime + fadeInOrOutDuration;

  return true;
}
