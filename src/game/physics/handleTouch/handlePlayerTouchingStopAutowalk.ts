import type { GameState } from "@/game/gameState/GameState";
import type { PlayableItem } from "@/model/ItemInPlay";
import type { CharacterName } from "@/model/modelTypes";

/**
 *
 * @returns true if the player lost a life
 */
export function handlePlayerTouchingStopAutowalk<RoomId extends string>(
  _gameState: GameState<RoomId>,
  subjectItem: PlayableItem<CharacterName, RoomId>,
): boolean {
  subjectItem.state.autoWalk = false;

  return false;
}
