import { iterateRoomItems, type RoomState } from "../../../../model/RoomState";
import { iterateStoodOnByItems } from "../../../../model/stoodOnItemsLookup";

/** debug code - checks standingOn two-way linking for every item in a room */
export const validateStandingOn = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
) => {
  for (const bottom of iterateRoomItems(room.items)) {
    // check what is standing on this item. Since the standing relationship is linked two-way,
    // also implies checking what the items are stood on.
    for (const top of iterateStoodOnByItems(bottom.state.stoodOnBy, room)) {
      if (top.state.standingOnItemId !== bottom.id) {
        throw new Error(
          `broken two-way linking. ${bottom.id} reports being stood on by ${top.id} (full list is ${Object.keys(bottom.state.stoodOnBy)}),
            but ${top.id} does not report standing on ${bottom.id}`,
        );
      }
    }
  }
};
