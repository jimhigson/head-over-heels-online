import { setStandingOn } from "./setStandingOn";
import { removeStandingOn } from "./removeStandingOn";
import {
  spatiallyCheckStandingOn,
  findStandingOnWithHighestPriorityAndMostOverlap,
} from "../../collision/checkStandingOn";
import {
  iterateRoomItems,
  roomItemsIterable,
  type RoomState,
} from "../../../model/RoomState";
import { iterateStoodOnByItems } from "../../../model/stoodOnItemsLookup";

/**
 * remove the standing on if not still applies, and
 * set a new standing on if that applies instead
 */
export const updateStandingOn = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
) => {
  /**
   * standing on updated here for all - because, eg, if a lift moves down with a player on it,
   * if the check is done inside the lift's tick, the player is then not on the lift and has no
   * ability to walk (the walk mechanic will return a null result) while the lift descends
   */
  for (const item of iterateRoomItems(room.items)) {
    try {
      // check what is standing on us - this implies that we're also checking what everything is stood on,
      // but gives us a chance to apply latent movement:
      for (const stander of iterateStoodOnByItems(item.state.stoodOnBy, room)) {
        if (!room.items[stander.id]) {
          // stander is no longer in the room:
          removeStandingOn(stander, room);
          continue;
        }

        if (!spatiallyCheckStandingOn(stander, item)) {
          removeStandingOn(stander, room);
          // if we are standing on something else (ie, walked from one block to an adjacent block) get that
          // set up so that in the next frame there is no pause in the walking (detects in the walk mechanic on
          // the very next frame that we can walk)
          const newStandingOn = findStandingOnWithHighestPriorityAndMostOverlap(
            stander,
            roomItemsIterable(room.items),
          );
          if (newStandingOn !== undefined) {
            setStandingOn({ above: stander, below: newStandingOn });
          }
        }
      }
    } catch (e) {
      throw new Error(`could not update standing on for item "${item.id}"`, {
        cause: e,
      });
    }
  }
};
