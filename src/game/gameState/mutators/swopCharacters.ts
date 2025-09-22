import type { IndividualCharacterName } from "../../../model/modelTypes";

import { otherIndividualCharacterName } from "../../../model/modelTypes";
import { type GameState } from "../GameState";
import { selectCanCombine } from "../gameStateSelectors/selectCanCombine";
import { selectPlayableItem } from "../gameStateSelectors/selectPlayableItem";
import { addItemToRoom } from "./addItemToRoom";
import { deleteItemFromRoom } from "./deleteItemFromRoom";
import { setStandingOn } from "./standingOn/setStandingOn";
import {
  combinePlayablesInSymbiosis,
  uncombinePlayablesFromSymbiosis,
} from "./symbiosis";

export const swopFromUncombinedToCombinedPlayables = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  const room = gameState.characterRooms["head"]!;
  const head = selectPlayableItem(gameState, "head")!;
  const heels = selectPlayableItem(gameState, "heels")!;
  const headOverHeels = combinePlayablesInSymbiosis({ head, heels });

  deleteItemFromRoom({ room, item: "head" });
  deleteItemFromRoom({ room, item: "heels" });
  addItemToRoom({ room, item: headOverHeels });
  gameState.previousPlayable =
    gameState.currentCharacterName as IndividualCharacterName;
  gameState.currentCharacterName = "headOverHeels";
  gameState.characterRooms = {
    head: undefined,
    heels: undefined,
    headOverHeels: room,
  };
  // note : headOverHeels is left without an entry state because they never
  // entered this room in symbiosis
};

const swopFromCombinedToUncombinedPlayables = <RoomId extends string>(
  gameState: GameState<RoomId>,
  toPlayable?: IndividualCharacterName,
) => {
  const room = gameState.characterRooms["headOverHeels"]!;
  const headOverHeels = selectPlayableItem(gameState, "headOverHeels")!;

  const switchingToCharacter =
    toPlayable ?? otherIndividualCharacterName(gameState.previousPlayable!);

  const { head, heels } = uncombinePlayablesFromSymbiosis(headOverHeels);

  deleteItemFromRoom({ room, item: "headOverHeels" });
  addItemToRoom({ room, item: head });
  addItemToRoom({ room, item: heels });
  setStandingOn({ above: head, below: heels });
  gameState.currentCharacterName = switchingToCharacter;
  gameState.previousPlayable = undefined;
  gameState.characterRooms = {
    head: room,
    heels: room,
    headOverHeels: undefined,
  };
  // note: head and heels entryState is not added to because joining does not
  // change how they entered this room
};

const highlightCurrentPlayable = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  const current = selectPlayableItem(gameState, gameState.currentCharacterName);
  if (current === undefined) {
    return;
  }
  if (current.type === "headOverHeels") {
    current.state.head.switchedToAt = current.state.head.gameTime;
    current.state.heels.switchedToAt = current.state.heels.gameTime;
  } else {
    current.state.switchedToAt = current?.state.gameTime;
  }
};

/**
 * @param toPlayable override the original's cycling through players to go directly to
 * one of the characters (from symbiosis maybe)
 */
export const swopPlayables = <RoomId extends string>(
  gameState: GameState<RoomId>,
  toPlayable?: IndividualCharacterName,
) => {
  if (
    selectCanCombine(gameState) &&
    // if requesting to go to the other playable, don't combine
    (!toPlayable ||
      // but if selecting to go to the already-selected character, that's a request to combine
      toPlayable === gameState.currentCharacterName)
  ) {
    swopFromUncombinedToCombinedPlayables(gameState);
  } else if (gameState.currentCharacterName === "headOverHeels") {
    swopFromCombinedToUncombinedPlayables(gameState, toPlayable);
  } else if (!toPlayable || toPlayable !== gameState.currentCharacterName) {
    // normal swop - one player for another (so long as we have the other to switch to)
    const otherCharInGame =
      selectPlayableItem(
        gameState,
        otherIndividualCharacterName(gameState.currentCharacterName),
      ) !== undefined;

    if (otherCharInGame) {
      gameState.currentCharacterName = otherIndividualCharacterName(
        gameState.currentCharacterName,
      );
    }

    // TODO: don't allow to swop if the current character is playing death animation
  }

  // even if no switch happened (which can only happen if toPlayable was given),
  // highlight the character that was requested to switch to to give some feedback
  highlightCurrentPlayable(gameState);
};
