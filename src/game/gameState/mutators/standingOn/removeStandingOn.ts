import type { FreeItem } from "../../../physics/itemPredicates";
import type { UnindexedRoomState } from "../../saving/SavedGameState";

import { stoodOnItem } from "../../../../model/stoodOnItemsLookup";

export const removeStandingOn = <
  RoomId extends string,
  RoomItemId extends string,
>(
  aboveItem: FreeItem<RoomId, RoomItemId>,
  room: UnindexedRoomState<RoomId, RoomItemId>,
) => {
  if (aboveItem.state.standingOnItemId !== null) {
    const belowItem = stoodOnItem(aboveItem.state.standingOnItemId, room);
    delete belowItem.state.stoodOnBy[aboveItem.id];
    aboveItem.state.previousStandingOnItemId = aboveItem.state.standingOnItemId;
    aboveItem.state.standingOnItemId = null;
    belowItem.state.stoodOnUntilRoomTime = room.roomTime;
    aboveItem.state.standingOnUntilRoomTime = room.roomTime;
  }
};
