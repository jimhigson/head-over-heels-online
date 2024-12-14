// if the period of the frame rate is less than this value, each rendering tick
// will be split into multiple physics ticks down to this size:
// this needs to be small enough that the fastest movement
// (jumping: 2px per frame in original game @25fps, so 50px per second)
// can be guaranteed to take up every half-pixel position.

import type {
  UnknownItemInPlay,
  ItemInPlayType,
  AnyItemInPlay,
} from "@/model/ItemInPlay";
import { isPlayableItem } from "../physics/itemPredicates";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { objectValues } from "iter-tools";
import type { GameState } from "../gameState/GameState";
import { currentPlayableItem, currentRoom } from "../gameState/GameState";
import { tickItem } from "./tickItem";
import { swopCharacters } from "../gameState/mutators/swopCharacters";
import { characterLosesLife } from "../gameState/mutators/characterLosesLife";
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
import {
  spatiallyCheckStandingOn,
  findStandingOnWithHighestPriorityAndMostOverlap,
} from "../collision/checkStandingOn";
import { originalFramePeriod } from "../render/animationTimings";
import {
  removeStandingOn,
  setStandingOn,
} from "../gameState/mutators/removeStandingOn";
import { deleteItemFromRoomInPlay } from "../gameState/mutators/deleteItemFromRoomInPlay";

// any frame with more than this deltaMS will be split into multiple physics ticks
// eg, for getting into smaller gaps
const maximumDeltaMS = 9;

const itemHasExpired = <RoomId extends string>(
  item: UnknownItemInPlay,
  gameState: GameState<RoomId>,
) => item.state.expires !== null && item.state.expires < gameState.gameTime;

/**
 * snap all items that haven't moved to the pixel grid - sub-pixel locations are
 * only allowed while items are moving
 */

const snapStationaryItemsToPixelGrid = <RoomId extends string>(
  room: RoomState<PlanetName, RoomId>,
  startingPositions: Record<string, Xyz>,
) => {
  for (const item of objectValues(room.items)) {
    const startingPosition: Xyz | undefined = startingPositions[item.id];
    if (startingPosition === undefined) {
      // no position at the start of the tick: item was introduced during the tick
      continue;
    }

    const itemIsStationary = xyzEqual(startingPosition, item.state.position);
    const shouldSnap =
      itemIsStationary && !isExactIntegerXyz(item.state.position);

    if (shouldSnap) {
      console.log(`snapping item ${item.id} to pixel grid`);
      item.state.position = roundXyz(item.state.position);
    }
  }
};

const removeNonApplicableStandingOn = <RoomId extends string>(
  items: Array<UnknownItemInPlay<RoomId>>,
) => {
  /**
   * standing on updated here for all - because, eg, if a lift moves down with a player on it,
   * if the check is done inside the lift's tick, the player is then not on the lift and has no
   * ability to walk (the walk mechanic will return a null result) while the lift descends
   */
  for (const item of items) {
    // check what is standing on us - this implies that we're also checking what everything is stood on,
    // but gives us a chance to apply latent movement:
    for (const stander of item.state.stoodOnBy) {
      if (!spatiallyCheckStandingOn(stander, item)) {
        removeStandingOn(stander);
        // if we are standing on something else (ie, walked from one block to an adjacent block) get that
        // set up so that in the next frame there is no pause in the walking (detects in the walk mechanic on
        // the very next frame that we can walk)
        const newStandingOn = findStandingOnWithHighestPriorityAndMostOverlap(
          stander,
          items,
        );
        if (newStandingOn !== undefined) {
          setStandingOn(stander, newStandingOn);
        }
      }
    }
  }
};

const assignLatentMovement = <RoomId extends string>(
  movedItems: Set<AnyItemInPlay>,
  gameState: GameState<RoomId>,
  startingPositions: Record<string, Xyz>,
) => {
  /**
   * standing on updated here for all - because, eg, if a lift moves down with a player on it,
   * if the check is done inside the lift's tick, the player is then not on the lift and has no
   * ability to walk (the walk mechanic will return a null result) while the lift descends
   */
  for (const moverItem of movedItems) {
    const previousPosition: Xyz | undefined = startingPositions[moverItem.id];

    if (previousPosition === undefined) {
      // item was introduced to the world during this tick, can't have latent movement:
      continue;
    }

    // check what is standing on us - this implies that we're also checking what everything is stood on,
    // but gives us a chance to apply latent movement:
    const movementDelta = subXyz(moverItem.state.position, previousPosition);
    // latent movement is only horizontal - anything else, collisions and gravity can handle
    const latentMovement = { ...movementDelta, z: 0 };

    if (!xyzEqual(latentMovement, originXyz)) {
      for (const stander of moverItem.state.stoodOnBy) {
        stander.state.latentMovement.push({
          // since the original game pushes items every other frame, the practical latency
          // for standing-on items is two frames
          moveAtGameTime: gameState.gameTime + 2 * originalFramePeriod,
          positionDelta: latentMovement,
        });
      }
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

/* the items that moved while progressing the game state */
export type MovedItems = Set<AnyItemInPlay>;

export const progressGameState = <RoomId extends string>(
  gameState: GameState<RoomId>,
  deltaMS: number,
): MovedItems => {
  const deltaMSScaled = deltaMS * gameState.gameSpeed;
  const physicsTickCount = Math.ceil(deltaMSScaled / maximumDeltaMS);
  const physicsTickMs = deltaMSScaled / physicsTickCount;

  const { inputState } = gameState;

  if (inputState.swop) {
    swopCharacters(gameState);
    // we have now handled that keypress, turn it off until the key is pressed again,
    // which will turn this flag back on
    inputState.swop = false;
    // now we let the room play through normally on the assumption it isn't harmful to do so
  }

  const room = currentRoom(gameState);

  // take a snapshot of item positions before any physics ticks so we
  // can check later what has moved. DOne per physics tick, not render-tick
  // because otherwise latent movement is double-applied
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
          // now we let the room play through normally on the assumption it isn't harmful to do so
        } else {
          deleteItemFromRoomInPlay({ room, item });
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
        // item was removed from the room (eg, was picked up by heels)
        continue;
      }
      tickItem(item, room, gameState, physicsTickMs);
    }

    removeNonApplicableStandingOn(sortedItems);

    //setStandingOnForAllItemsInRoom(room, gameState.progression);

    gameState.progression++;
    gameState.gameTime += physicsTickMs;

    //  not sure if this is needed - is it really harmful to progress the room a little bit after the player left the room?
    //    if (room !== currentRoom(gameState)) {
    // room changed during the tick - that's fine but move on so the game can render the next room:
    //      return moveMap;
    //    }
  }

  const movedItems = new Set<AnyItemInPlay>(
    iterate(objectValues(room.items)).filter(
      (i) =>
        // wasn't in the room before (treated like a move)
        startingPositions[i.id] === undefined ||
        // moved on this frame:
        !xyzEqual(i.state.position, startingPositions[i.id]),
    ),
  );
  assignLatentMovement(movedItems, gameState, startingPositions);
  snapStationaryItemsToPixelGrid(room, startingPositions);

  return movedItems;
};
