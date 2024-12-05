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
import type { FreeItem } from "../physics/itemPredicates";
import { isFreeItem } from "../physics/itemPredicates";
import { isPlayableItem } from "../physics/itemPredicates";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { objectValues } from "iter-tools";
import type { GameState } from "../gameState/GameState";
import { currentPlayableItem, currentRoom } from "../gameState/GameState";
import { tickItem } from "./tickItem";
import { swopCharacters } from "../gameState/swopCharacters";
import { characterLosesLife } from "../gameState/gameStateTransitions/characterLosesLife";
import { objectEntriesIter } from "@/utils/entries";
import type { Xyz } from "@/utils/vectors/vectors";
import {
  xyzEqual,
  isExactIntegerXyz,
  roundXyz,
  subXyz,
  originXyz,
} from "@/utils/vectors/vectors";
import { iterate } from "@/utils/iterate";
import { checkStandingOn } from "../collision/checkStandingOn";
import { originalFramePeriod } from "../render/animationTimings";

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
  delete room.items[itemToDelete.id];

  // anything that was stood on a deleted item isn't standing on it any more:
  for (const stoodOnItem of itemToDelete.state.stoodOnBy) {
    if (isFreeItem(stoodOnItem)) {
      stoodOnItem.state.standingOn = null;
    }
  }
};

/**
 * snap all items that haven't moved to the pixel grid - sub-pixel locations are
 * only allowed while items are moving
 */

const snapStationaryItemsToPixelGrid = <RoomId extends string>(
  room: RoomState<PlanetName, RoomId>,
  startingPositions: Record<string, Xyz>,
) => {
  for (const item of objectValues(room.items)) {
    const itemIsStationary = xyzEqual(
      startingPositions[item.id],
      item.state.position,
    );
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

  const room = currentRoom(gameState);

  // take a snapshot of item positions before any physics ticks so we can check later what has moved:
  const startingPositions = Object.fromEntries(
    iterate(objectEntriesIter(room.items)).map(([id, item]) => [
      id,
      item.state.position,
    ]),
  );

  for (let i = 0; i < physicsTickCount; i++) {
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

    const sortedItems = Object.values(room.items).sort(itemTickOrderComparator);

    for (const item of sortedItems) {
      if (currentPlayableItem(gameState).state.action === "death") {
        // all physics is suspended while death animation plays
        break;
      }

      if (room.items[item.id] === undefined) {
        // should never happen, but throw if it does
        throw new Error(`item ${item.id} is not in room ${room.id}`);
      }
      if (tickItem(item, room, gameState, physicsTickMs)) {
        return;
      }
    }

    /**
     * standing on updated here for all - because, eg, if a lift moves down with a player on it,
     * if the check is done inside the lift's tick, the player is then not on the lift and has no
     * ability to walk (the walk mechanic will return a null result) while the lift descends
     */
    for (const item of sortedItems) {
      // check what is standing on us - this implies that we're also checking what everything is stood on,
      // but gives us a chance to apply latent movement:
      for (const s of item.state.stoodOnBy) {
        if (!checkStandingOn(s, item, gameState.progression)) {
          removeStandingOn(s);
        } else {
          const finalDelta = subXyz(
            item.state.position,
            startingPositions[item.id],
          );
          // latent movement is only horizontal - anything else, collisions and gravity can handle
          const latentMovement = { ...finalDelta, z: 0 };
          if (!xyzEqual(latentMovement, originXyz)) {
            s.state.latentMovement.push({
              // since the original game pushes items every other frame, the practical latency
              // for standing-on items is two frames
              moveAtGameTime: gameState.gameTime + 2 * originalFramePeriod,
              positionDelta: latentMovement,
            });
          }
        }
      }
    }

    //setStandingOnForAllItemsInRoom(room, gameState.progression);

    gameState.progression++;
    gameState.gameTime += physicsTickMs;

    if (room !== currentRoom(gameState)) {
      throw new Error(
        `room has changed during physics tick ${room.id} -> ${currentRoom(gameState).id} but did not return out of the tick`,
      );
    }
  }

  snapStationaryItemsToPixelGrid(room, startingPositions);
};

const removeStandingOn = <RoomId extends string>(
  item: FreeItem<PlanetName, RoomId>,
) => {
  if (item.state.standingOn !== null) {
    item.state.standingOn.state.stoodOnBy.delete(item);
  }
  item.state.standingOn = null;
};
