import type { GameState } from "@/game/gameState/GameState";
import type { PlayableItem } from "@/model/ItemInPlay";

/**
 *
 * @returns true if the player lost a life
 */
export function handlePlayerTouchingStopAutowalk<RoomId extends string>(
  _gameState: GameState<RoomId>,
  subjectItem: PlayableItem<string>,
): boolean {
  subjectItem.state.autoWalk = false;

  return false;
}
