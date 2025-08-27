import type { CharacterName } from "../../../model/modelTypes";

import { isItemType, type PlayableItem } from "../itemPredicates";
import { handlePlayerTouchingDeadly } from "./handlePlayerTouchingDeadly";
import { handlePlayerTouchingDoorFrame } from "./handlePlayerTouchingDoorFrame";
import { handlePlayerTouchingPickup } from "./handlePlayerTouchingPickup";
import { handlePlayerTouchingPortal } from "./handlePlayerTouchingPortal";
import {
  type ItemTouchEvent,
  touchedItemIsDeadly,
  touchedItemIsType,
} from "./ItemTouchEvent";

const doesNotStopAutowalk = isItemType(
  "floor",
  "doorLegs",
  "doorFrame",
  "portal",
);

/**
 * @returns true is the physics needs to halt after this handler
 */
export const handlePlayerTouchingItem = <
  RoomId extends string,
  RoomItemId extends string,
>(
  e: ItemTouchEvent<
    RoomId,
    RoomItemId,
    PlayableItem<CharacterName, RoomId, RoomItemId>
  >,
) => {
  switch (true) {
    case touchedItemIsDeadly(e):
      handlePlayerTouchingDeadly<RoomId, RoomItemId>(e);
      break;

    case touchedItemIsType(e, "portal"):
      handlePlayerTouchingPortal(e);
      // has activated the portal - halt all physics:
      break;

    case touchedItemIsType(e, "pickup"):
      handlePlayerTouchingPickup(e);
      break;

    case touchedItemIsType(e, "doorFrame"):
      handlePlayerTouchingDoorFrame(e);
      break;
  }

  if (!doesNotStopAutowalk(e.touchedItem)) {
    // the "stopAutowalk" special item is in front of every door
    // to ensure there's something to collide with when coming through,
    // but to fix the player getting stuck in an autowalk (if there's an
    // item in front of the door that can't be pushed) we also stop if
    // they collide with anything other than a few scenery items:
    e.movingItem.state.autoWalk = false;
  }
};
