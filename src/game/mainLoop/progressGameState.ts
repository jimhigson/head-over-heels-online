// if the period of the frame rate is less than this value, each rendering tick
// will be split into multiple physics ticks down to this size:
// this needs to be small enough that the fastest movement
// (jumping: 2px per frame in original game @25fps, so 50px per second)
// can be guaranteed to take up every half-pixel position.

import type { UnknownItemInPlay, AnyItemInPlay } from "@/model/ItemInPlay";
import { isPlayableItem, itemFalls } from "@/model/ItemInPlay";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { iterate } from "@/utils/iterate";
import { objectValues } from "iter-tools";
import type { GameState } from "../gameState/GameState";
import { currentPlayableItem, currentRoom } from "../gameState/GameState";
import { tickItem } from "./tickItem";
import { swopCharacters } from "../gameState/swopCharacters";
import { characterLosesLife } from "../gameState/gameStateTransitions/characterLosesLife";
import { isExactIntegerXyz, roundXyz, xyzEqual } from "@/utils/vectors";

//  So, 10ms = 0.01s, at 50px/s gives 0.01 * 50 = 0.5px
// however, with parabolic jumping (g=0.0002m/s²) the speed at 1block of z gain can be as muc has
// 0.085px/ms or 85px/s (!) 2ms/0.002s at 85px/s give 0.17px which (experimentally) seems to be small enough
const maximumDeltaMS = 2;

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
  for (const item of iterate(objectValues(room.items))) {
    if (itemFalls(item) && item.state.standingOn === itemToDelete) {
      item.state.standingOn = null;
    }
  }
};

/**
 * snap all items that haven't moved to the pixel grid - sub-pixel locations are
 * only allowed while items are moving
 */
const snapStationaryItemsToPixelGrid = <RoomId extends string>(
  room: RoomState<PlanetName, RoomId>,
) => {
  for (const item of objectValues(room.items)) {
    const previousPosition = item.lastRenderedState!.position;

    const itemIsStationary = xyzEqual(previousPosition, item.state.position);
    const snapToPixelGrid =
      itemIsStationary && !isExactIntegerXyz(item.state.position);

    if (item.type === "heels") {
      console.log(
        `item ${item.id} is stationary: ${itemIsStationary} and should snap to pixel grid: ${snapToPixelGrid}`,
      );
    }

    if (snapToPixelGrid) {
      console.log(`snapping item ${item.id} to pixel grid`);
      item.state.position = roundXyz(item.state.position);
    }
  }
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

  const room = currentRoom(gameState);

  for (const item of objectValues(room.items)) {
    item.lastRenderedState = { ...item.state };
  }

  for (let i = 0; i < physicsTickCount; i++) {
    //console.log("a new frame is being processed, deltaMs is", deltaMS);

    gameState.gameTime += physicsTickMs;

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

    for (const item of objectValues(room.items)) {
      if (currentPlayableItem(gameState).state.action === "death") {
        // all physics is suspended while death animation plays
        break;
      }
      tickItem(item, gameState, physicsTickMs);
    }
  }

  snapStationaryItemsToPixelGrid(room);
};
