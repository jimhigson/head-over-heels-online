import {
  selectCurrentRoomState,
  type GameState,
} from "../game/gameState/GameState";
import type { ItemState } from "../model/ItemInPlay";
import type { TestRoomId } from "./basicRoom";

export const headState = (gameState: GameState<TestRoomId>) => {
  // TODO: cast should be unnecessary with known item ids
  return gameState.characterRooms.head!.items["head"]!.state as ItemState<
    "head",
    string,
    string
  >;
};

export const heelsState = (gameState: GameState<TestRoomId>) => {
  // TODO: cast should be unnecessary with known item ids
  return gameState.characterRooms.heels!.items["heels"]!.state as ItemState<
    "heels",
    string,
    string
  >;
};

export const itemState = (gameState: GameState<TestRoomId>, itemId: string) => {
  return selectCurrentRoomState(gameState)?.items[itemId]?.state;
};
