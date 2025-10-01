import {
  iterateRoomItems,
  roomItemsIterable,
  type RoomState,
} from "../../../../model/RoomState";
import { iterateStoodOnByItems } from "../../../../model/stoodOnItemsLookup";
import {
  findStandingOnWithHighestPriorityAndMostOverlap,
  spatiallyCheckStandingOn,
} from "../../../collision/checkStandingOn";
import { removeStandingOn } from "./removeStandingOn";
import { setStandingOnWithoutRemovingOldFirst } from "./setStandingOn";

/**
 * Check over a room's items:
 *    * remove the standing on if not still applies, and
 *    * set a new standing on if that applies instead
 *
 * this is done once per (sub)tick, not in each item's individual updates.
 *
 * Eg, if a lift moves down with a player on it,
 * if the check is done inside the lift's tick, the player is then not on the lift and has no
 * ability to walk (the walk mechanic will return a null result) while the lift descends
 */
export const updateStandingOn = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
) => {
  for (const bottom of iterateRoomItems(room.items)) {
    try {
      // check what is standing on this item. Since the standing relationship is linked two-way,
      // also implies checking what the items are stood on.
      for (const top of iterateStoodOnByItems(bottom.state.stoodOnBy, room)) {
        if (!room.items[top.id]) {
          // stander is no longer in the room:
          removeStandingOn(top, room);
          continue;
        }

        if (!spatiallyCheckStandingOn(top, bottom)) {
          removeStandingOn(top, room);
          // if we are standing on something else (ie, walked from one block to an adjacent block) get that
          // set up so that in the next frame there is no pause in the walking (detects in the walk mechanic on
          // the very next frame that we can walk)
          const newStandingOn = findStandingOnWithHighestPriorityAndMostOverlap(
            top,
            roomItemsIterable(room.items),
          );
          if (newStandingOn !== undefined) {
            setStandingOnWithoutRemovingOldFirst({
              above: top,
              below: newStandingOn,
            });
          }
        }
      }
    } catch (e) {
      throw new Error(`could not update standing on for item "${bottom.id}"`, {
        cause: e,
      });
    }
  }
};
