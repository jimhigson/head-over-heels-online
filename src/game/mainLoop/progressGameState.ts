// if the period of the frame rate is less than this value, each rendering tick
// will be split into multiple physics ticks down to this size:
// this needs to be small enough that the fastest movement
// (jumping: 2px per frame in original game @25fps, so 50px per second)
// can be guaranteed to take up every half-pixel position.

import type {
  UnknownItemInPlay,
  AnyItemInPlay,
  ItemInPlayType,
} from "@/model/ItemInPlay";
import { isPlayableItem, positionContainerPosition } from "@/model/ItemInPlay";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { objectValues } from "iter-tools";
import type { GameState } from "../gameState/GameState";
import { currentPlayableItem, currentRoom } from "../gameState/GameState";
import { tickItem } from "./tickItem";
import { swopCharacters } from "../gameState/swopCharacters";
import { characterLosesLife } from "../gameState/gameStateTransitions/characterLosesLife";
import { isExactIntegerXyz, roundXyz, xyzEqual } from "@/utils/vectors/vectors";
import { setStandingOnForAllItemsInRoom } from "../gameState/setStandingOnForAllItemsInRoom";

// any frame with more than this deltaMS will be split into multiple physics ticks
// eg, for getting into smaller gaps
const maximumDeltaMS = 20;

const itemHasExpired = <RoomId extends string>(
  item: UnknownItemInPlay,
  gameState: GameState<RoomId>,
) => item.state.expires !== null && item.state.expires < gameState.gameTime;

const deleteItemFromRoom = <RoomId extends string>(
  room: RoomState<PlanetName, RoomId>,
  itemToDelete: AnyItemInPlay<RoomId>,
) => {
  if (itemToDelete.positionContainer !== undefined) {
    itemToDelete.positionContainer.destroy();
  }
  delete room.items[itemToDelete.id];

  // check if anything was standing on this item:
  /*
  just leave these dangling references for now:
  for (const item of iterate(objectValues(room.items))) {
    if (isFreeItem(item) && item.state.standingOn === itemToDelete) {
      item.state.standingOn = null;
    }
  }*/
};

/**
 * snap all items that haven't moved to the pixel grid - sub-pixel locations are
 * only allowed while items are moving
 */
const snapStationaryItemsToPixelGrid = <RoomId extends string>(
  room: RoomState<PlanetName, RoomId>,
) => {
  for (const item of objectValues(room.items)) {
    if (item.positionContainer === undefined) {
      continue;
    }

    const previousPosition = item.positionContainer[positionContainerPosition];

    const itemIsStationary = xyzEqual(previousPosition, item.state.position);
    const shouldSnap =
      itemIsStationary && !isExactIntegerXyz(item.state.position);

    if (shouldSnap) {
      console.log(`snapping item ${item.id} to pixel grid`);
      item.state.position = roundXyz(item.state.position);
    }
  }
};

/**
 * it matters what order items are processed in - for example, lifts move but nothing can move a lift, so
 * lifts should be processed first so they can push everything else before they can also move and fail
 * to push the lift
 */
const itemTickOrderComparator = (
  a: UnknownItemInPlay,
  b: UnknownItemInPlay,
) => {
  const scores: Partial<Record<ItemInPlayType, number>> = {
    lift: -4, // <- highest priority
    head: -3,
    heels: -3,
    baddie: -2,
    // everything else goes here
    block: 1, // <- lowest priority
    deadlyBlock: 1, // <- lowest priority
  };

  const aScore = scores[a.type] ?? 0;
  const bScore = scores[b.type] ?? 0;

  return aScore - bScore;
};

export const progressGameState = <RoomId extends string>(
  gameState: GameState<RoomId>,
  deltaMS: number,
) => {
  const physicsTickCount = Math.ceil(deltaMS / maximumDeltaMS);
  const physicsTickMs = deltaMS / physicsTickCount;

  const { inputState } = gameState;

  if (inputState.swop) {
    swopCharacters(gameState);
    // we have now handled that keypress, turn it off until the key is pressed again,
    // which will turn this flag back on
    inputState.swop = false;
    return;
  }

  for (let i = 0; i < physicsTickCount; i++) {
    const room = currentRoom(gameState);

    //console.log(`----➡️ progressing game one physics tick in ${room.id}----`);

    //console.log("a new frame is being processed, deltaMs is", deltaMS);

    for (const item of objectValues(room.items)) {
      if (itemHasExpired(item, gameState)) {
        if (isPlayableItem(item)) {
          characterLosesLife(gameState);
          // we won't run the rest of the render tick now, so the next render
          // gets the true starting room state
          return;
        } else {
          deleteItemFromRoom(room, item);
        }
      }
    }

    for (const item of Object.values(room.items).sort(
      itemTickOrderComparator,
    )) {
      if (currentPlayableItem(gameState).state.action === "death") {
        // all physics is suspended while death animation plays
        break;
      }

      if (room.items[item.id] === undefined) {
        // should never happen, but throw if it does
        throw new Error(`item ${item.id} is not in room ${room.id}`);
      }
      if (tickItem(item, gameState, physicsTickMs)) {
        return;
      }
    }

    setStandingOnForAllItemsInRoom(room, gameState.progression);

    gameState.progression++;
    gameState.gameTime += physicsTickMs;
  }

  snapStationaryItemsToPixelGrid(currentRoom(gameState));
};
