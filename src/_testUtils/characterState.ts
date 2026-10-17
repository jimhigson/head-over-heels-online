import { type GameState } from "../game/gameState/GameState";
import { selectCurrentRoomState } from "../game/gameState/gameStateSelectors/selectCurrentRoomState";
import { type ItemInPlay, type ItemInPlayType } from "../model/ItemInPlay";
import { type ItemState } from "../model/ItemState";
import { getRoomItem } from "../model/RoomState";
import { type TestRoomId } from "./basicRoom";

/** head's state, in whichever room head is in */
export const headState = (gameState: GameState<TestRoomId>) => {
  return gameState.characterRooms.head!.items["head"]!.state as ItemState<
    "head",
    string,
    string
  >;
};

/** heels' state, in whichever room heels is in */
export const heelsState = (gameState: GameState<TestRoomId>) => {
  return gameState.characterRooms.heels!.items["heels"]!.state as ItemState<
    "heels",
    string,
    string
  >;
};

/** the joined headOverHeels' state, in whichever room they are in */
export const headOverHeelsState = (gameState: GameState<TestRoomId>) => {
  return gameState.characterRooms.headOverHeels!.items["headOverHeels"]!
    .state as ItemState<"headOverHeels", string, string>;
};

/** the state of whichever character is currently being played */
export const currentPlayableState = (gameState: GameState<TestRoomId>) => {
  const currentPlayable = gameState.currentCharacterName;
  return getRoomItem(
    currentPlayable,
    gameState.characterRooms[currentPlayable]!.items,
  )!.state;
};

/** an item of the given type T, by id, from the current room */
export const item = <T extends ItemInPlayType>(
  gameState: GameState<TestRoomId>,
  itemId: string,
) => {
  return selectCurrentRoomState(gameState)?.items[itemId] as
    ItemInPlay<T, TestRoomId, string> | undefined;
};

/** the state of an item of the given type, by id, from the current room */
export const itemState = <T extends ItemInPlayType>(
  gameState: GameState<TestRoomId>,
  itemId: string,
) => {
  return item<T>(gameState, itemId)?.state as ItemState<T, TestRoomId, string>;
};
