import { iterateRoomItems, type RoomState } from "../../model/RoomState";
import { xyzSnapIfCloseToIntegers } from "../../utils/vectors/vectors";
import { updateItemPosition } from "../gameState/mutators/updateItemPosition";

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
  for (const item of iterateRoomItems(room.items)) {
    const originalPosition = item.state.position;
    const maybeSnapped = xyzSnapIfCloseToIntegers(originalPosition);
    if (maybeSnapped !== originalPosition) {
      updateItemPosition(room, item, maybeSnapped);
    }
  }
};
