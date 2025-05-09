import type { GameState } from "../gameState/GameState";
import { tickItem } from "./tickItem";
import { playableLosesLife } from "../gameState/mutators/characterLosesLife";
import { deleteItemFromRoom } from "../gameState/mutators/deleteItemFromRoom";
import { updateStandingOn } from "../gameState/mutators/updateStandingOn";
import { assignLatentMovementFromStandingOn } from "../gameState/mutators/assignLatentMovement";
import { selectCurrentPlayableItem } from "../gameState/gameStateSelectors/selectPlayableItem";
import { objectValues } from "iter-tools";
import { iterate } from "../../utils/iterate";
import { xyzEqual } from "../../utils/vectors/vectors";
import { isPlayableItem } from "../physics/itemPredicates";
import type { UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import { emptySet } from "../../utils/empty";
import { iterateRoomItemEntries } from "../../model/RoomState";
import { selectCurrentRoomState } from "../gameState/gameStateSelectors/selectCurrentRoomState";
import { snapInactiveItemsToPixelGrid } from "./snapInactiveItemsToPixelGrid";
import { itemHasExpired } from "./itemHasExpired";
import { correctFloatingPointErrorsInRoom } from "./correctFloatingPointErrorsInRoom";
import { itemTickOrderComparator } from "./itemTickOrderComparator";
import { advanceTime } from "./advanceTime";

/* the items that moved while progressing the game state */
export type MovedItems<RoomId extends string, RoomItemId extends string> = Set<
  UnionOfAllItemInPlayTypes<RoomId, RoomItemId>
>;

export type ProgressGameState<
  RoomId extends string,
  RoomItemId extends string,
> = (
  gameState: GameState<RoomId>,
  deltaMS: number,
) => MovedItems<RoomId, RoomItemId>;

export const progressGameState = <
  RoomId extends string,
  RoomItemId extends string,
>(
  gameState: GameState<RoomId>,
  deltaMS: number,
): MovedItems<RoomId, RoomItemId> => {
  const room = selectCurrentRoomState(gameState);

  if (room === undefined) {
    // no playables in rooms - game over
    return emptySet;
  }

  // advance time before applying the mechanics of the game
  // so item's acted on times will match the current game time in the
  // renderers (renderers can check if items are acted on in the current frame)
  advanceTime(gameState, room, deltaMS);

  // take a snapshot of item positions before any physics ticks so we
  // can check later what has moved. DOne per physics tick, not render-tick
  // because otherwise latent movement is double-applied
  const startingPositions = Object.fromEntries(
    iterateRoomItemEntries(room.items).map(([id, item]) => [
      id,
      item.state.position,
    ]),
  );

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
    try {
      tickItem(item, room, gameState, deltaMS);
    } catch (e) {
      console.error(e);
      throw new Error(`error caught while ticking item "${item.id}"`, {
        cause: e,
      });
    }
  }

  updateStandingOn(room);

  // floating point correction must be done before looking for moved items:
  correctFloatingPointErrorsInRoom(room);

  const movedItems = new Set(
    iterate(objectValues(room.items)).filter(
      (i) =>
        // wasn't in the room before (treated like a move)
        startingPositions[i.id] === undefined ||
        // moved on this frame:
        !xyzEqual(i.state.position, startingPositions[i.id]),
    ),
  ) as MovedItems<RoomId, RoomItemId>;

  assignLatentMovementFromStandingOn(movedItems, room, startingPositions);
  snapInactiveItemsToPixelGrid(room, movedItems);

  return movedItems;
};
