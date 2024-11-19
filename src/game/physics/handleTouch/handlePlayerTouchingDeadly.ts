import type { GameState } from "@/game/gameState/GameState";
import { characterFadeInOrOutDuration } from "@/game/render/animationTimings";
import type { PlayableItem } from "@/model/ItemInPlay";

/**
 *
 * @returns true if the player lost a life
 */
export function handlePlayerTouchingDeadly<RoomId extends string>(
  gameState: GameState<RoomId>,
  subjectItem: PlayableItem<string>,
): boolean {
  subjectItem.state.action = "death";
  subjectItem.state.expires = gameState.gameTime + characterFadeInOrOutDuration;

  return true;
}
