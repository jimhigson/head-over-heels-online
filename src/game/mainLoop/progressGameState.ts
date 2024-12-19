import type {
  UnknownItemInPlay,
  ItemInPlayType,
  AnyItemInPlay,
} from "@/model/ItemInPlay";
import { isPlayableItem } from "../physics/itemPredicates";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { concat, objectValues } from "iter-tools";
import type { GameState } from "../gameState/GameState";
import { selectCurrentRoom } from "../gameState/GameState";
import { tickItem } from "./tickItem";
import { swopPlayables } from "../gameState/mutators/swopCharacters";
import { playableLosesLife } from "../gameState/mutators/characterLosesLife";
import { objectEntriesIter } from "@/utils/entries";
import type { Xyz } from "@/utils/vectors/vectors";
import { xyzEqual, isExactIntegerXyz, roundXyz } from "@/utils/vectors/vectors";
import { iterate } from "@/utils/iterate";
import { deleteItemFromRoom } from "../gameState/mutators/deleteItemFromRoom";
import { removeNoLongerStandingOn } from "../gameState/mutators/removeNoLongerStandingOn";
import { assignLatentMovement } from "../gameState/mutators/assignLatentMovement";
import { selectCurrentPlayableItem } from "../gameState/gameStateSelectors/selectPlayableItem";

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
  if (gameState.gameSpeed > 1) {
    let movedItems = new Set<AnyItemInPlay>();
    for (let i = 0; i < gameState.gameSpeed; i++) {
      movedItems = new Set(
        concat(movedItems, _progressGameState(gameState, deltaMS)),
      );
    }
    return movedItems;
  }

  // gamespeed is 1 or <1
  return _progressGameState(gameState, deltaMS * gameState.gameSpeed);
};

export const _progressGameState = <RoomId extends string>(
  gameState: GameState<RoomId>,
  deltaMS: number,
): MovedItems => {
  const { inputState } = gameState;

  const room = selectCurrentRoom(gameState);

  // take a snapshot of item positions before any physics ticks so we
  // can check later what has moved. DOne per physics tick, not render-tick
  // because otherwise latent movement is double-applied
  const startingPositions = Object.fromEntries(
    iterate(objectEntriesIter(room.items)).map(([id, item]) => [
      id,
      item.state.position,
    ]),
  );

  if (inputState.swop) {
    swopPlayables(gameState);
    // we have now handled that keypress, turn it off until the key is pressed again,
    // which will turn this flag back on
    inputState.swop = false;
    // now we let the room play through normally on the assumption it isn't harmful to do so
  }

  for (const item of objectValues(room.items)) {
    if (itemHasExpired(item, gameState)) {
      deleteItemFromRoom({ room, item });
      if (isPlayableItem(item)) {
        // playableLosesLife may put the playable character back into the room,
        // if they have lives left:
        playableLosesLife(gameState, item);
        // now we let the room play through normally on the assumption it isn't harmful to do so
      }
    }
  }

  const sortedItems = Object.values(room.items).sort(itemTickOrderComparator);

  for (const item of sortedItems) {
    if (selectCurrentPlayableItem(gameState).state.action === "death") {
      // all physics is suspended while death animation plays
      break;
    }

    if (room.items[item.id] === undefined) {
      // item was removed from the room (eg, was picked up by heels)
      continue;
    }
    tickItem(item, room, gameState, deltaMS);
  }

  removeNoLongerStandingOn(room);

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

  gameState.progression++;
  gameState.gameTime += deltaMS;

  return movedItems;
};
