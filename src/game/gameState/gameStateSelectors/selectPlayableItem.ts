import { isItemType, type PlayableItem } from "@/game/physics/itemPredicates";
import type {
  CharacterName,
  IndividualCharacterName,
} from "@/model/modelTypes";
import type { GameState } from "../GameState";
import type { HeadAbilities, HeelsAbilities } from "@/model/ItemStateMap";

const isHead = isItemType("head");
const isHeels = isItemType("heels");
const isHeadOverHeels = isItemType("headOverHeels");

export const selectPlayableItem = <
  C extends CharacterName = CharacterName,
  RoomId extends string = string,
>(
  gameState: GameState<RoomId>,
  character: C,
): PlayableItem<C, RoomId> | undefined => {
  return gameState.characterRooms[character]?.room.items[character] as
    | PlayableItem<C, RoomId>
    | undefined;
};

export const selectCurrentPlayableItem = <RoomId extends string>(
  gameState: GameState<RoomId>,
): PlayableItem =>
  // assuming both players haven't lost all their lives, or this is not reliable!
  selectPlayableItem(gameState, gameState.currentCharacterName)!;

export const selectHeadAbilities = (
  playable: PlayableItem<CharacterName>,
): HeadAbilities | undefined => {
  if (isHead(playable)) {
    return playable.state;
  }
  if (isHeadOverHeels(playable)) {
    return playable.state.head;
  }
};
export const selectHeelsAbilities = (
  playable: PlayableItem<CharacterName>,
): HeelsAbilities<string> | undefined => {
  if (isHeels(playable)) {
    return playable.state;
  }
  if (isHeadOverHeels(playable)) {
    return playable.state.heels;
  }
};
export const _selectAbilities = <RoomId extends string>(
  gameState: GameState<RoomId>,
  individualCharacterName: IndividualCharacterName,
):
  | HeadAbilities
  | HeelsAbilities<string>
  | undefined => /*| (I extends "head" ? HeadAbilities : never)
  | (I extends "heels" ? HeelsAbilities<string> : never)
  | undefined */ {
  const playable = selectPlayableItem(
    gameState,
    gameState.currentCharacterName === "headOverHeels" ?
      "headOverHeels"
    : individualCharacterName,
  ) as PlayableItem;

  if (individualCharacterName === "head" && isHead(playable)) {
    return playable.state;
  }
  if (individualCharacterName === "heels" && isHeels(playable)) {
    return playable.state;
  }
  if (individualCharacterName === "head" && isHeadOverHeels(playable)) {
    return playable.state.head;
  }
  if (individualCharacterName === "heels" && isHeadOverHeels(playable)) {
    return playable.state.heels;
  }
};

// refine the typing past what ts will let me put in the original
export const selectAbilities = _selectAbilities as <
  RoomId extends string,
  I extends IndividualCharacterName,
>(
  gameState: GameState<RoomId>,
  individualCharacterName: I,
) =>
  | (I extends "head" ? HeadAbilities : never)
  | (I extends "heels" ? HeelsAbilities<string> : never)
  | undefined;
