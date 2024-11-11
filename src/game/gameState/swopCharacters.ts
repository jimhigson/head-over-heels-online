import type { GameState } from "./GameState";

export const swopCharacters = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  gameState.currentCharacterName =
    gameState.currentCharacterName === "head" ? "heels" : "head";
};
