import type { RoomState } from "../../../model/RoomState";
import type { FreeItem } from "../../physics/itemPredicates";

import { stoodOnItem } from "../../../model/stoodOnItemsLookup";

export const removeStandingOn = <
  RoomId extends string,
  RoomItemId extends string,
>(
  aboveItem: FreeItem<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
) => {
  if (aboveItem.state.standingOnItemId !== null) {
    const belowItem = stoodOnItem(aboveItem.state.standingOnItemId, room);
    delete belowItem.state.stoodOnBy[aboveItem.id];
    aboveItem.state.standingOnItemId = null;
    belowItem.state.stoodOnUntilRoomTime = room.roomTime;
  }
};
