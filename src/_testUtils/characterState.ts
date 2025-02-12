import {
  selectCurrentRoomState,
  type GameState,
} from "../game/gameState/GameState";
import type { TestRoomId } from "./basicRoom";

export const headState = (gameState: GameState<TestRoomId>) => {
  return gameState.characterRooms.head!.items["head"]!.state;
};

export const heelsState = (gameState: GameState<TestRoomId>) => {
  return gameState.characterRooms.heels!.items["heels"]!.state;
};

export const itemState = (gameState: GameState<TestRoomId>, itemId: string) => {
  return selectCurrentRoomState(gameState)?.items[itemId]?.state;
};
