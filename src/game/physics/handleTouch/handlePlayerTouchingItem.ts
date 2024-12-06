import { handlePlayerTouchingDeadly } from "./handlePlayerTouchingDeadly";
import { handlePlayerTouchingPickup } from "./handlePlayerTouchingPickup";
import { handlePlayerTouchingPortal } from "./handlePlayerTouchingPortal";
import { handlePlayerTouchingDoorFrame } from "./handlePlayerTouchingDoorFrame";
import { handlePlayerTouchingStopAutowalk } from "./handlePlayerTouchingStopAutowalk";
import type { CharacterName } from "@/model/modelTypes";
import { handlePlayerTouchingScroll } from "./handlePlayerTouchingScroll";
import { touchedItemIsType, type ItemTouchEvent } from "./ItemTouchEvent";
import { deadlyItemTypes, isItemType } from "../itemPredicates";
import { makeItemFadeOut } from "@/game/gameState/mutators/makeItemFadeOut";

/**
 * @returns true is the physics needs to halt after this handler
 */
export const handlePlayerTouchingItem = <RoomId extends string>(
  e: ItemTouchEvent<RoomId, CharacterName>,
) => {
  switch (true) {
    case touchedItemIsType(e, "stopAutowalk"):
      if (handlePlayerTouchingStopAutowalk<RoomId>(e)) {
        return true;
      }
      break;
    case touchedItemIsType(e, ...deadlyItemTypes) ||
      (touchedItemIsType(e, "floor") && e.touchedItem.config.deadly):
      if (handlePlayerTouchingDeadly<RoomId>(e)) {
        return true;
      }
      break;

    case touchedItemIsType(e, "portal"):
      if (handlePlayerTouchingPortal(e)) {
        // has activated the portal - halt all physics:
        return true;
      }
      break;

    case touchedItemIsType(e, "pickup"):
      handlePlayerTouchingPickup(e);
      break;

    case touchedItemIsType(e, "doorFrame"):
      if (handlePlayerTouchingDoorFrame(e)) {
        return true;
      }
      break;

    case touchedItemIsType(e, "block", "barrier"): {
      const disappearing =
        (isItemType("barrier")(e.touchedItem) &&
          e.touchedItem.config.disappearing) ||
        (isItemType("block")(e.touchedItem) &&
          e.touchedItem.state.disappearing);

      if (disappearing) {
        makeItemFadeOut(e.touchedItem, e.gameState);
      }
      break;
    }

    case touchedItemIsType(e, "scroll"):
      handlePlayerTouchingScroll(e);
  }

  return false;
};
