import type { MovedItems } from "./progressGameState";

import { iterateRoomItems, type RoomState } from "../../model/RoomState";
import { isExactIntegerXyz, roundXyz } from "../../utils/vectors/vectors";
import { isFreeItem } from "../physics/itemPredicates";

/**
 * snap all items that haven't been acted on the pixel grid - sub-pixel
 * locations are only allowed while items are moving
 */
export const snapInactiveItemsToPixelGrid = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  /**
   * the items we already know moved - any that this function snaps
   * will also be added to the set
   */
  movedItems: MovedItems<RoomId, RoomItemId>,
) => {
  for (const item of iterateRoomItems(room.items)) {
    if (!isFreeItem(item) || room.roomTime === item.state.actedOnAt.roomTime) {
      // was acted on in this tick - do not snap
      continue;
    }

    if (!isExactIntegerXyz(item.state.position)) {
      // console.log(
      //   `snapping item ${item.id} to pixel grid (not acted on in tick)`,
      //   item.state.position,
      //   "->",
      //   roundXyz(item.state.position),
      // );
      item.state.position = roundXyz(item.state.position);
      movedItems.add(item);
    }
  }
};
