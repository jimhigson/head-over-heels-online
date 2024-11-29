import type { GameState } from "@/game/gameState/GameState";
import { fadeInOrOutDuration } from "@/game/render/animationTimings";
import type { PlayableItem } from "@/model/ItemInPlay";
import type { CharacterName } from "@/model/modelTypes";

/**
 *
 * @returns true if the player lost a life
 */
export function handlePlayerTouchingDeadly<RoomId extends string>(
  gameState: GameState<RoomId>,
  subjectItem: PlayableItem<CharacterName, RoomId>,
): boolean {
  subjectItem.state.action = "death";
  subjectItem.state.expires = gameState.gameTime + fadeInOrOutDuration;

  return true;
}
