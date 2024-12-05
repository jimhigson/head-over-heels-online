import { currentRoom, type GameState } from "@/game/gameState/GameState";
import type { TestRoomId } from "./basicRoom";

export const headState = (gameState: GameState<TestRoomId>) => {
  return gameState.characterRooms.head!.room.items["head"]!.state;
};

export const heelsState = (gameState: GameState<TestRoomId>) => {
  return gameState.characterRooms.heels!.room.items["heels"]!.state;
};

export const itemState = (gameState: GameState<TestRoomId>, itemId: string) => {
  return currentRoom(gameState).items[itemId]!.state;
};
