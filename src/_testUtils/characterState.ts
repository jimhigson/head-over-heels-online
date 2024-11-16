import type { GameState } from "@/game/gameState/GameState";
import type { TestRoomId } from "./basicRoom";

export const headState = (gameState: GameState<TestRoomId>) => {
  return gameState.characterRooms.head!.room.items[
    gameState.currentCharacterName
  ]!.state;
};

export const heelsState = (gameState: GameState<TestRoomId>) => {
  return gameState.characterRooms.heels!.room.items[
    gameState.currentCharacterName
  ]!.state;
};
