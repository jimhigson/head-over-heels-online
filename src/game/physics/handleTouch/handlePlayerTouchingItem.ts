import { handlePlayerTouchingDeadly } from "./handlePlayerTouchingDeadly";
import { handlePlayerTouchingPickup } from "./handlePlayerTouchingPickup";
import { handlePlayerTouchingPortal } from "./handlePlayerTouchingPortal";
import { handlePlayerTouchingDoorFrame } from "./handlePlayerTouchingDoorFrame";
import { handlePlayerTouchingStopAutowalk } from "./handlePlayerTouchingStopAutowalk";
import {
  touchedItemIsDeadly,
  touchedItemIsType,
  type ItemTouchEvent,
} from "./ItemTouchEvent";
import type { PlayableItem } from "../itemPredicates";
import type { CharacterName } from "@/model/modelTypes";

/**
 * @returns true is the physics needs to halt after this handler
 */
export const handlePlayerTouchingItem = <RoomId extends string>(
  e: ItemTouchEvent<RoomId, PlayableItem<CharacterName, RoomId>>,
) => {
  switch (true) {
    case touchedItemIsType(e, "stopAutowalk"):
      handlePlayerTouchingStopAutowalk<RoomId>(e);
      break;

    case touchedItemIsDeadly(e):
      handlePlayerTouchingDeadly<RoomId>(e);
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
};
