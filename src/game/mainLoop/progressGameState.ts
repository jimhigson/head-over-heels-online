import type { GameState } from "../gameState/GameState";
import { selectCurrentRoomState } from "../gameState/GameState";
import { tickItem } from "./tickItem";
import { swopPlayables } from "../gameState/mutators/swopCharacters";
import { playableLosesLife } from "../gameState/mutators/characterLosesLife";
import { deleteItemFromRoom } from "../gameState/mutators/deleteItemFromRoom";
import { updateStandingOn } from "../gameState/mutators/updateStandingOn";
import { assignLatentMovementFromStandingOn } from "../gameState/mutators/assignLatentMovement";
import {
  selectCurrentPlayableItem,
  selectPlayableItem,
} from "../gameState/gameStateSelectors/selectPlayableItem";
import { concat, objectValues } from "iter-tools";
import { iterate } from "../../utils/iterate";
import type { Xyz } from "../../utils/vectors/vectors";
import {
  isExactIntegerXyz,
  roundXyz,
  xyzEqual,
} from "../../utils/vectors/vectors";
import { isFreeItem, isPlayableItem } from "../physics/itemPredicates";
import type {
  UnionOfAllItemInPlayTypes,
  AnyItemInPlay,
  ItemInPlayType,
} from "../../model/ItemInPlay";
import { otherIndividualCharacterName } from "../../model/modelTypes";
import { emptyObject, emptySet } from "../../utils/empty";
import {
  iterateRoomItemEntries,
  iterateRoomItems,
  type RoomState,
  type RoomStateItems,
} from "../../model/RoomState";

const itemHasExpired = <RoomId extends string, RoomItemId extends string>(
  item: UnionOfAllItemInPlayTypes,
  room: RoomState<RoomId, RoomItemId>,
) => item.state.expires !== null && item.state.expires < room.roomTime;

/**
 * snap all items that haven't moved to the pixel grid - sub-pixel locations are
 * only allowed while items are moving
 */

const snapStationaryItemsToPixelGrid = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  startingPositions: Record<string, Xyz>,
  /** the items which are snapped will be added to this set */
  movedItems: Set<AnyItemInPlay>,
) => {
  for (const item of iterateRoomItems(room.items)) {
    if (!isFreeItem(item) || room.roomTime === item.state.actedOnAt) {
      // was acted on in this tick - do not snap
      continue;
    }

    if (!isExactIntegerXyz(item.state.position)) {
      console.log(
        `snapping item ${item.id} to pixel grid (not acted on in tick)`,
      );
      item.state.position = roundXyz(item.state.position);
      movedItems.add(item);
    }
  }
};

/**
 * it matters what order items are processed in - for example, lifts move but nothing can move a lift, so
 * lifts should be processed first so they can push everything else before they can also move and fail
 * to push the lift
 */
const itemTickOrderComparator = (
  a: UnionOfAllItemInPlayTypes,
  b: UnionOfAllItemInPlayTypes,
) => {
  const scores: Partial<Record<ItemInPlayType, number>> = {
    lift: -4, // <- highest priority
    head: -3,
    heels: -3,
    monster: -2,
    // everything else goes here
    block: 1, // <- lowest priority
    deadlyBlock: 1, // <- lowest priority
  };

  const aScore = scores[a.type] ?? 0;
  const bScore = scores[b.type] ?? 0;

  return aScore - bScore;
};

/* the items that moved while progressing the game state */
export type MovedItems<RoomId extends string, RoomItemId extends string> = Set<
  AnyItemInPlay<RoomId, RoomItemId>
>;

const noItems = emptyObject as RoomStateItems<string, string>;

export const progressGameState = <RoomId extends string>(
  gameState: GameState<RoomId>,
  deltaMS: number,
): MovedItems => {
  // DEBUG CODE:
  // force extra sub-ticks when gameSpeed > 1, to emulate the game being
  // progressed that many times
  if (gameState.gameSpeed > 1) {
    let movedItems = new Set<AnyItemInPlay>();
    for (let i = 0; i < gameState.gameSpeed; i++) {
      const subtickMoves = _progressGameState(gameState, deltaMS);
      const itemsAtEndOfSubtick =
        selectCurrentRoomState(gameState)?.items ?? noItems;
      movedItems = new Set(
        iterate(
          // add the new moved items onto the old one:
          concat(movedItems, subtickMoves),
        )
          // remove from movedItems any items that no longer exist in the room:
          .filter(({ id }) => itemsAtEndOfSubtick[id] !== undefined),
      );
    }
    return movedItems;
  }

  // gamespeed is 1 or <1
  return _progressGameState(gameState, deltaMS * gameState.gameSpeed);
};

export const _progressGameState = <
  RoomId extends string,
  RoomItemId extends string,
>(
  gameState: GameState<RoomId>,
  deltaMS: number,
): MovedItems<RoomId, RoomItemId> => {
  const { inputStateTracker } = gameState;

  const room = selectCurrentRoomState(gameState);

  if (room === undefined) {
    // no playables in rooms - game over
    return emptySet;
  }

  // take a snapshot of item positions before any physics ticks so we
  // can check later what has moved. DOne per physics tick, not render-tick
  // because otherwise latent movement is double-applied
  const startingPositions = Object.fromEntries(
    iterateRoomItemEntries(room.items).map(([id, item]) => [
      id,
      item.state.position,
    ]),
  );

  if (inputStateTracker.currentActionPress("swop") === "tap") {
    swopPlayables(gameState);
  }
  if (inputStateTracker.currentActionPress("swop.head") === "tap") {
    swopPlayables(gameState, "head");
  }
  if (inputStateTracker.currentActionPress("swop.heels") === "tap") {
    swopPlayables(gameState, "heels");
  }

  for (const item of objectValues(room.items)) {
    if (itemHasExpired(item, room)) {
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
    const playable = selectCurrentPlayableItem(gameState);
    if (playable === undefined || playable.state.action === "death") {
      // all physics is suspended if no characters left (lost all lives) or
      // while death animation plays
      break;
    }

    if (room.items[item.id] === undefined) {
      // item was removed from the room (eg, was picked up by heels)
      continue;
    }
    tickItem(item, room, gameState, deltaMS);
  }

  updateStandingOn(room);

  const movedItems = new Set<AnyItemInPlay>(
    iterate(objectValues(room.items)).filter(
      (i) =>
        // wasn't in the room before (treated like a move)
        startingPositions[i.id] === undefined ||
        // moved on this frame:
        !xyzEqual(i.state.position, startingPositions[i.id]),
    ),
  );
  assignLatentMovementFromStandingOn(movedItems, room, startingPositions);
  snapStationaryItemsToPixelGrid(room, startingPositions, movedItems);

  advanceTime(gameState, room, deltaMS);

  return movedItems;
};

const advanceTime = <RoomId extends string, RoomItemId extends string>(
  gameState: GameState<RoomId>,
  room: RoomState<RoomId, RoomItemId>,
  deltaMS: number,
) => {
  gameState.progression++;
  gameState.gameTime += deltaMS;
  room.roomTime += deltaMS;
  const playable = selectCurrentPlayableItem(gameState);

  if (playable === undefined) {
    return;
  }

  if (playable.type === "headOverHeels") {
    playable.state.head.gameTime += deltaMS;
    playable.state.heels.gameTime += deltaMS;
  } else {
    playable.state.gameTime += deltaMS;

    const charactersInSameRoom =
      gameState.characterRooms.head === gameState.characterRooms.heels;

    if (charactersInSameRoom) {
      // advance the other character's time too since they're both in play:
      const other = selectPlayableItem(
        gameState,
        otherIndividualCharacterName(playable.type),
      );
      if (other !== undefined) {
        other.state.gameTime += deltaMS;
      }
    }
  }
};
