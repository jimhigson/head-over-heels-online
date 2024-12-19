import type { IndividualCharacterName } from "@/model/modelTypes";
import { otherIndividualCharacterName } from "@/model/modelTypes";
import { type GameState } from "../GameState";
import { selectPlayableItem } from "../gameStateSelectors/selectPlayableItem";
import { addItemToRoom } from "./addItemToRoom";
import { deleteItemFromRoom } from "./deleteItemFromRoom";

import { addXyz } from "@/utils/vectors/vectors";
import { blockSizePx } from "@/sprites/spritePivots";
import { setStandingOn } from "./modifyStandingOn";
import { selectCanCombine } from "../gameStateSelectors/selectCanCombine";
import {
  uncombinePlayablesFromSymbiosis,
  combinePlayablesInSymbiosis,
} from "./symbiosis";

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

  // little jump to make it obvious who we switched to:
  if (switchingToCharacter === "head") {
    head.state.position = addXyz(head.state.position, { z: blockSizePx.h });
  } else {
    head.state.position = addXyz(head.state.position, { z: blockSizePx.h });
    heels.state.position = addXyz(heels.state.position, { z: blockSizePx.h });
  }

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

    // TODO: don't allow to swop if the other character has zero lives
    // TODO: don't allow to swop if the current character is playing death animation

    gameState.currentCharacterName = otherIndividualCharacterName(
      gameState.currentCharacterName,
    );
  }
};
