import { slidingItemTypes } from "../itemPredicates";
import { handlePlayerTouchingItem } from "./handlePlayerTouchingItem";
import { handleBaddieTouchingItem } from "../mechanics/baddieAi";
import { handleItemTouchingSwitch } from "./handleItemTouchingSwitch";
import {
  handleItemTouchingSlidingItem,
  handleSlidingItemTouchingAnyItem,
} from "./handleItemTouchingSlidingItem";
import { handlePlayerTouchingJoystick } from "./handlePlayerTouchingJoystick";
import {
  movingItemIsType,
  touchedItemIsType,
  type ItemTouchEvent,
} from "./ItemTouchEvent";
import { characterNames } from "@/model/modelTypes";

/**
 * same old - Morties touching Morties
 */
export const handleItemsTouchingItems = <RoomId extends string>(
  e: ItemTouchEvent<RoomId>,
): boolean => {
  switch (true) {
    case movingItemIsType(e, ...characterNames):
      if (handlePlayerTouchingItem(e)) return true;
      break;

    // if something moved into the player, we flip it and handle like the player moved into it:
    case touchedItemIsType(e, ...characterNames):
      if (
        handlePlayerTouchingItem({
          ...e,
          movingItem: e.touchedItem,
          touchedItem: e.movingItem,
        })
      )
        return true;
      break;

    case touchedItemIsType(e, ...slidingItemTypes):
      if (handleItemTouchingSlidingItem(e)) return true;
      break;

    case movingItemIsType(e, ...slidingItemTypes):
      if (handleSlidingItemTouchingAnyItem(e)) return true;
      break;

    case movingItemIsType(e, "baddie"):
      if (handleBaddieTouchingItem(e)) return true;
      break;

    case touchedItemIsType(e, "switch"):
      if (handleItemTouchingSwitch(e)) return true;
      break;

    case touchedItemIsType(e, "joystick"):
      if (handlePlayerTouchingJoystick(e)) return true;
  }

  return false;
};
