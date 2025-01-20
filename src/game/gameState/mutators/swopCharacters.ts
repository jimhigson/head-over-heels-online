import { type GameState } from "../GameState";
import { selectPlayableItem } from "../gameStateSelectors/selectPlayableItem";
import { addItemToRoom } from "./addItemToRoom";
import { deleteItemFromRoom } from "./deleteItemFromRoom";

import { setStandingOn } from "./modifyStandingOn";
import { selectCanCombine } from "../gameStateSelectors/selectCanCombine";
import {
  uncombinePlayablesFromSymbiosis,
  combinePlayablesInSymbiosis,
} from "./symbiosis";
import type { IndividualCharacterName } from "../../../model/modelTypes";
import { otherIndividualCharacterName } from "../../../model/modelTypes";

const swopFromUncombinedToCombinedPlayables = <RoomId extends string>(
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
) => {
  const room = gameState.characterRooms["headOverHeels"]!;
  const headOverHeels = selectPlayableItem(gameState, "headOverHeels")!;

  const switchingToCharacter = otherIndividualCharacterName(
    gameState.previousPlayable!,
  );

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

export const swopPlayables = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  if (selectCanCombine(gameState)) {
    swopFromUncombinedToCombinedPlayables(gameState);
  } else if (gameState.currentCharacterName === "headOverHeels") {
    swopFromCombinedToUncombinedPlayables(gameState);
  } else {
    // normal swop - one player for another
    if (
      selectPlayableItem(
        gameState,
        otherIndividualCharacterName(gameState.currentCharacterName),
      ) === undefined
    ) {
      // other player isn't in the game - can't swop to them
      return;
    }

    // TODO: don't allow to swop if the current character is playing death animation

    gameState.currentCharacterName = otherIndividualCharacterName(
      gameState.currentCharacterName,
    );
  }

  highlightCurrentPlayable(gameState);
};
