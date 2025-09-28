import type { ItemInPlay, ItemInPlayType } from "../model/ItemInPlay";
import type { ItemState } from "../model/ItemState";
import type { TestRoomId } from "./basicRoom";

import { type GameState } from "../game/gameState/GameState";
import { selectCurrentRoomState } from "../game/gameState/gameStateSelectors/selectCurrentRoomState";
import { getRoomItem } from "../model/RoomState";

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

export const currentPlayableState = (gameState: GameState<TestRoomId>) => {
  const currentPlayable = gameState.currentCharacterName;
  return getRoomItem(
    currentPlayable,
    gameState.characterRooms[currentPlayable]!.items,
  )!.state;
};

export const item = <T extends ItemInPlayType>(
  gameState: GameState<TestRoomId>,
  itemId: string,
) => {
  return selectCurrentRoomState(gameState)?.items[itemId] as
    | ItemInPlay<T, TestRoomId, string>
    | undefined;
};

export const itemState = <T extends ItemInPlayType>(
  gameState: GameState<TestRoomId>,
  itemId: string,
) => {
  return item<T>(gameState, itemId)?.state as ItemState<T, TestRoomId, string>;
};
