import { isSolid, slidingItemTypes } from "../itemPredicates";
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
import { handleFiredDonutTouchingBaddie } from "./handleFiredDonutTouchingBaddie";

/**
 * same old - Morties touching Morties
 */
export const handleItemsTouchingItems = <RoomId extends string>(
  e: ItemTouchEvent<RoomId>,
) => {
  // if the player moved into something, we handle that:
  if (movingItemIsType(e, ...characterNames)) {
    handlePlayerTouchingItem(e);
  }

  // if something moved into the player, we flip it and handle like the player moved into it:
  if (touchedItemIsType(e, ...characterNames)) {
    handlePlayerTouchingItem({
      ...e,
      movingItem: e.touchedItem,
      touchedItem: e.movingItem,
    });
  }

  if (touchedItemIsType(e, ...slidingItemTypes)) {
    handleItemTouchingSlidingItem(e);
  }

  if (movingItemIsType(e, ...slidingItemTypes)) {
    handleSlidingItemTouchingAnyItem(e);
  }

  if (
    (movingItemIsType(e, "baddie") && touchedItemIsType(e, "firedDonut")) ||
    (movingItemIsType(e, "firedDonut") && touchedItemIsType(e, "baddie"))
  ) {
    handleFiredDonutTouchingBaddie(e);
  }

  if (movingItemIsType(e, "baddie")) {
    handleBaddieTouchingItem(e);
  }

  if (touchedItemIsType(e, "switch")) {
    handleItemTouchingSwitch(e);
  }

  if (touchedItemIsType(e, "joystick")) {
    handlePlayerTouchingJoystick(e);
  }

  if (e.touchedItem.state.disappear) {
    handleItemTouchingDissapearing(e);
  }
  // is the thing that moved has disappearing (more unusual case but could be a powerup falling on player for example,
  // flip and treat like it is the thing that was touched):
  if (
    e.movingItem.state.disappear &&
    // solid check: eg, firedDonuts don't disappear on touching the stopAutowalk in front of a door
    isSolid(e.touchedItem)
  ) {
    handleItemTouchingDissapearing({
      ...e,
      movingItem: e.touchedItem,
      touchedItem: e.movingItem,
    });
  }
};
