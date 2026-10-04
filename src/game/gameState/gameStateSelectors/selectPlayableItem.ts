import { type PlayableItem } from "../../../model/ItemInPlayNarrowedUnions";
import {
  type HeadAbilities,
  type HeelsAbilities,
} from "../../../model/ItemStateMap";
import {
  type CharacterName,
  type IndividualCharacterName,
} from "../../../model/modelTypes";
import { type GameState } from "../GameState";

export const selectPlayableItem = <
  C extends CharacterName = CharacterName,
  RoomId extends string = string,
  RoomItemId extends string = string,
>(
  gameState: Pick<GameState<RoomId>, "characterRooms">,
  character: C,
): PlayableItem<C, RoomId, RoomItemId> | undefined => {
  return gameState.characterRooms[character]?.items[character] as
    PlayableItem<C, RoomId, RoomItemId> | undefined;
};

/**
 * @returns undefined only if both players have lost all lives
 */
export const selectCurrentPlayableItem = <
  RoomId extends string,
  RoomItemId extends string = string,
>(
  gameState: Pick<GameState<RoomId>, "characterRooms" | "currentCharacterName">,
): PlayableItem<CharacterName, RoomId, RoomItemId> | undefined =>
  // assuming both players haven't lost all their lives, or this is not reliable!
  selectPlayableItem(gameState, gameState.currentCharacterName)!;

export const selectHeadAbilities = (
  playable: PlayableItem<CharacterName>,
): HeadAbilities | undefined => {
  if (playable.type === "head") {
    return playable.state;
  }
  if (playable.type === "headOverHeels") {
    return playable.state.head;
  }
};
export const selectHeelsAbilities = <
  RoomId extends string,
  RoomItemId extends string,
>(
  playable: PlayableItem<CharacterName, RoomId, RoomItemId>,
): HeelsAbilities<RoomId, RoomItemId> | undefined => {
  if (playable.type === "heels") {
    return playable.state;
  }
  if (playable.type === "headOverHeels") {
    return playable.state.heels;
  }
};
const _selectAbilities = <RoomId extends string>(
  gameState: Pick<GameState<RoomId>, "characterRooms" | "currentCharacterName">,
  individualCharacterName: IndividualCharacterName,
):
  | HeadAbilities
  | HeelsAbilities<string, string>
  | undefined => /*| (I extends "head" ? HeadAbilities : never)
  | (I extends "heels" ? HeelsAbilities<string, string> : never)
  | undefined */ {
  const playable = selectPlayableItem(
    gameState,
    gameState.currentCharacterName === "headOverHeels" ?
      "headOverHeels"
    : individualCharacterName,
  ) as PlayableItem;

  if (playable === undefined) {
    return undefined;
  }

  if (individualCharacterName === "head" && playable.type === "head") {
    return playable.state;
  }
  if (individualCharacterName === "heels" && playable.type === "heels") {
    return playable.state;
  }
  if (individualCharacterName === "head" && playable.type === "headOverHeels") {
    return playable.state.head;
  }
  if (
    individualCharacterName === "heels" &&
    playable.type === "headOverHeels"
  ) {
    return playable.state.heels;
  }
};

// refine the typing past what ts will let me put in the original
export const selectAbilities = _selectAbilities as <
  RoomId extends string,
  I extends IndividualCharacterName,
>(
  gameState: Pick<GameState<RoomId>, "characterRooms" | "currentCharacterName">,
  individualCharacterName: I,
) =>
  | (I extends "head" ? HeadAbilities : never)
  | (I extends "heels" ? HeelsAbilities<RoomId, string> : never)
  | undefined;
