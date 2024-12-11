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
import { handleItemTouchingDissapearing } from "./handleItemTouchingDisappearing";

/**
 * same old - Morties touching Morties
 */
export const handleItemsTouchingItems = <RoomId extends string>(
  e: ItemTouchEvent<RoomId>,
): boolean => {
  if (movingItemIsType(e, ...characterNames) && handlePlayerTouchingItem(e))
    return true;

  // if something moved into the player, we flip it and handle like the player moved into it:
  if (
    touchedItemIsType(e, ...characterNames) &&
    handlePlayerTouchingItem({
      ...e,
      movingItem: e.touchedItem,
      touchedItem: e.movingItem,
    })
  )
    return true;

  if (
    touchedItemIsType(e, ...slidingItemTypes) &&
    handleItemTouchingSlidingItem(e)
  )
    return true;

  if (
    movingItemIsType(e, ...slidingItemTypes) &&
    handleSlidingItemTouchingAnyItem(e)
  )
    return true;

  if (movingItemIsType(e, "baddie") && handleBaddieTouchingItem(e)) return true;

  if (touchedItemIsType(e, "switch") && handleItemTouchingSwitch(e))
    return true;

  if (touchedItemIsType(e, "joystick") && handlePlayerTouchingJoystick(e))
    return true;

  if (e.touchedItem.state.disappear !== null) handleItemTouchingDissapearing(e);

  return false;
};
