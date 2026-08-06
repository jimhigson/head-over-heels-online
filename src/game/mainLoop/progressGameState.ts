import {
  iterateRoomItemEntries,
  roomItemsArray,
  roomItemsIterable,
} from "../../model/RoomState";
import { type GameState } from "../gameState/GameState";
import { selectCurrentRoomState } from "../gameState/gameStateSelectors/selectCurrentRoomState";
import { selectCurrentPlayableItem } from "../gameState/gameStateSelectors/selectPlayableItem";
import { assignLatentMovementFromStandingOn } from "../gameState/mutators/assignLatentMovement";
import { deleteItemFromRoom } from "../gameState/mutators/deleteItemFromRoom";
import { playableLosesLife } from "../gameState/mutators/playableLosesLife";
import { updateStandingOn } from "../gameState/mutators/standingOn/updateStandingOn";
import { validateStandingOn } from "../gameState/mutators/standingOn/validateStandingOn";
import { isPlayableItem } from "../physics/itemPredicates";
import { addParticlesForPlayablesInRoom } from "./addParticlesToRoom";
import { advanceTime } from "./advanceTime";
import { correctFloatingPointErrorsInRoom } from "./correctFloatingPointErrorsInRoom";
import { itemHasExpired } from "./itemHasExpired";
import { itemTickOrderComparator } from "./itemTickOrderComparator";
import { snapInactiveItemsToPixelGrid } from "./snapInactiveItemsToPixelGrid";
import { tickItem } from "./tickItem";

// set to 1 to check for inconsistencies in the model for every subtick
const extraDebugChecks = 0;

export type ProgressGameState<RoomId extends string> = (
  gameState: GameState<RoomId>,
  deltaMS: number,
) => void;

export const progressGameState = <
  RoomId extends string,
  RoomItemId extends string,
>(
  gameState: GameState<RoomId>,
  deltaMS: number,
): void => {
  const room = selectCurrentRoomState<RoomId, RoomItemId>(gameState);

  if (room === undefined) {
    // no current room - probably this is because game over
    return;
  }

  // items stamped after this progression count moved (or resized) during
  // this tick:
  const progressionAtTickStart = room.progression;

  // advance time before applying the mechanics of the game
  // so item's acted on times will match the current game time in the
  // renderers (renderers can check if items are acted on in the current frame)
  advanceTime(gameState, room, deltaMS);

  // take a snapshot of item positions before any physics ticks so latent
  // movement can compute per-tick deltas. Done per physics tick, not
  // render-tick, because otherwise latent movement is double-applied
  const startingPositions = Object.fromEntries(
    iterateRoomItemEntries(room.items).map(([id, item]) => [
      id,
      item.state.box,
    ]),
  );

  for (const item of roomItemsIterable(room.items)) {
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

  const sortedItems = roomItemsArray(room.items).sort(itemTickOrderComparator);

  for (const item of sortedItems) {
    const playable = selectCurrentPlayableItem(gameState);
    if (playable === undefined) {
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

  addParticlesForPlayablesInRoom(room, deltaMS);

  if (extraDebugChecks) {
    validateStandingOn(room);
  }
  updateStandingOn(room);

  // corrections route through the position-update funnel, so items they
  // adjust are stamped as moved like any other movement:
  correctFloatingPointErrorsInRoom(room);

  assignLatentMovementFromStandingOn(
    room,
    startingPositions,
    deltaMS,
    progressionAtTickStart,
  );
  snapInactiveItemsToPixelGrid(room);
};
