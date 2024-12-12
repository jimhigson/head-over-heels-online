import { otherCharacterName } from "@/model/modelTypes";
import { otherPlayableItem, type GameState } from "../GameState";

export const swopCharacters = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  if (otherPlayableItem(gameState) === undefined) {
    // other player doesn't exist in any room (has zero lives) - can't swop
    return;
  }

  // TODO: don't allow to swop if the other character has zero lives
  // TODO: don't allow to swop if the current character is playing death animation

  gameState.currentCharacterName = otherCharacterName(
    gameState.currentCharacterName,
  );
};
