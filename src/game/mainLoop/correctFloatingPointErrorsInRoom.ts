import { forEachRoomItem } from "../../model/roomItemsInPlayIterators";
import { type RoomState } from "../../model/RoomState";
import { xyzSnapIfCloseToIntegers } from "../../utils/vectors/vectors";
import { updateItemPosition } from "../gameState/mutators/updateItemBox";

/**
 * fix item positions where numbers should be integers but aren't quite
 *  - for example the number 99.99999999999999 coming out of the mtv/collisions
 * algorithm when it should be 100
 */
export const correctFloatingPointErrorsInRoom = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
) => {
  forEachRoomItem(room.items, (item) => {
    const originalPosition = item.state.box;
    const maybeSnapped = xyzSnapIfCloseToIntegers(originalPosition);
    if (maybeSnapped !== originalPosition) {
      updateItemPosition(room, item, maybeSnapped);
    }
  });
};
