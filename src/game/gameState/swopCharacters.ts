import { otherCharacterName } from "@/model/modelTypes";
import type { GameState } from "./GameState";

export const swopCharacters = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  // TODO: don't allow to swop if the other character has zero lives
  // TODO: don't allow to swop if the current character is playing death animation

  gameState.currentCharacterName = otherCharacterName(
    gameState.currentCharacterName,
  );
};
