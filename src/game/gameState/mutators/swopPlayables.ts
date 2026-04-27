import type { IndividualCharacterName } from "../../../model/modelTypes";
import type { RoomState } from "../../../model/RoomState";
import type { Xyz } from "../../../utils/vectors/vectors";
import type { FreeItem } from "../../physics/itemPredicates";

import { otherIndividualCharacterName } from "../../../model/modelTypes";
import { store } from "../../../store/store";
import { epsilon } from "../../../utils/epsilon";
import {
  addXyzWriteInto,
  lengthXyz,
  manhattanDistanceXy,
  scaleXyzWriteInto,
  subXyzWriteInto,
} from "../../../utils/vectors/vectors";
import { handleItemsTouchingItems } from "../../physics/handleTouch/handleItemsTouchingItems";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { moveItem } from "../../physics/moveItem/moveItem";
import { type GameState } from "../GameState";
import { selectCanCombine } from "../gameStateSelectors/selectCanCombine";
import { selectPlayableItem } from "../gameStateSelectors/selectPlayableItem";
import { dispatchSaveGame } from "../saving/dispatchSaveGame";
import { addItemToRoom } from "./addItemToRoom";
import { deleteItemFromRoom } from "./deleteItemFromRoom";
import { setStandingOnWithoutRemovingOldFirst } from "./standingOn/setStandingOnWithoutRemovingOldFirst";
import {
  combinePlayablesInSymbiosis,
  uncombinePlayablesFromSymbiosis,
} from "./symbiosis";

const maxSymbiosisStepIterations = 50;

const targetBuffer = { x: 0, y: 0, z: 0 };
const remainingVectorBuffer = { x: 0, y: 0, z: 0 };

/** move an item one step (at most 0.5px) towards a target position,
 * respecting collisions */
const stepTowards = <RoomId extends string>(
  gameState: GameState<RoomId>,
  room: RoomState<RoomId, string>,
  item: FreeItem<RoomId, string>,
  targetPosition: Xyz,
) => {
  subXyzWriteInto(remainingVectorBuffer, targetPosition, item.state.position);
  const remainingDistance = lengthXyz(remainingVectorBuffer);

  if (remainingDistance < epsilon) {
    return;
  }

  // return remaining vector to a step:
  if (remainingDistance >= 0.5) {
    scaleXyzWriteInto(
      remainingVectorBuffer,
      remainingVectorBuffer,
      0.5 / remainingDistance,
    );
  }

  moveItem({
    subjectItem: item,
    deltaMS: epsilon,
    posDelta: remainingVectorBuffer,
    gameState,
    room,
    onTouch: handleItemsTouchingItems,
  });
};

/**
 * @returns true is successful. Returns false if can't find a way to
 * align the characters with each other after several times trying
 */
export const swopFromUncombinedToCombinedPlayables = <RoomId extends string>(
  gameState: GameState<RoomId>,
): boolean => {
  const previousPlayable =
    gameState.currentCharacterName as IndividualCharacterName;
  const room = gameState.characterRooms["head"]!;
  const head = selectPlayableItem(gameState, "head")!;
  const heels = selectPlayableItem(gameState, "heels")!;

  let aligned = false;

  for (let i = 0; i < maxSymbiosisStepIterations; i++) {
    // step head towards heels:
    addXyzWriteInto(targetBuffer, heels.state.position, { z: blockSizePx.z });
    stepTowards(gameState, room, head, targetBuffer);

    // step heels towards head:
    addXyzWriteInto(targetBuffer, head.state.position, {
      z: -blockSizePx.z,
    });
    stepTowards(gameState, room, heels, targetBuffer);

    if (
      manhattanDistanceXy(head.state.position, heels.state.position) < epsilon
    ) {
      aligned = true;
      break;
    }
  }

  if (!aligned) {
    // this should be very rare, but it is possible, for example if
    // joining together creates an overlap that moveItem can't resolve
    // via normal movement
    return false;
  }

  const headOverHeels = combinePlayablesInSymbiosis({
    head,
    heels,
    previousPlayable,
  });

  deleteItemFromRoom({ room, item: "head" });
  deleteItemFromRoom({ room, item: "heels" });
  addItemToRoom({ room, item: headOverHeels });
  gameState.previousPlayable = previousPlayable;
  gameState.currentCharacterName = "headOverHeels";
  gameState.characterRooms = {
    head: undefined,
    heels: undefined,
    headOverHeels: room,
  };
  // note : headOverHeels is left without an entry state because they never
  // entered this room in symbiosis

  return true;
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
  setStandingOnWithoutRemovingOldFirst({ above: head, below: heels });
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

  // saving on swop is cheap and lets the active character persist across reloads
  dispatchSaveGame(gameState, store);
};
