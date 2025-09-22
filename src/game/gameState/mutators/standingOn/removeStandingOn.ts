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
  console.log(
    "⭐️ removeStandingOn:: removing standing on",
    aboveItem.id,
    "of",
    aboveItem.state.standingOnItemId,
    "in room",
    room.id,
  );

  if (aboveItem.state.standingOnItemId !== null) {
    const belowItem = stoodOnItem(aboveItem.state.standingOnItemId, room);
    console.log(
      "⭐️ removeStandingOn:: deleting stoodOnBy of",
      belowItem.id,
      "[",
      aboveItem.id,
      "]",
    );
    delete belowItem.state.stoodOnBy[aboveItem.id];
    aboveItem.state.standingOnItemId = null;
    belowItem.state.stoodOnUntilRoomTime = room.roomTime;
  }
};
