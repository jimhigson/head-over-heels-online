import { isSolid, slidingItemTypes } from "../itemPredicates";
import { handlePlayerTouchingItem } from "./handlePlayerTouchingItem";
import { handleItemWithMovementTouchingItem } from "../mechanics/movement";
import { handleItemTouchingSwitch } from "./handleItemTouchingSwitch";
import {
  handleItemTouchingSlidingItem,
  handleSlidingItemTouchingAnyItem,
} from "./handleItemTouchingSlidingItem";
import { handleItemTouchingJoystick } from "./handleItemTouchingJoystick";
import {
  movingItemIsPlayable,
  movingItemIsType,
  touchedItemIsPlayable,
  touchedItemIsType,
  type ItemTouchEvent,
} from "./ItemTouchEvent";
import { handleItemTouchingDissapearing } from "./handleItemTouchingDisappearing";
import { handleFiredDoughnutTouchingMonster } from "./handleFiredDoughnutTouchingMonster";

/**
 * same old - Morties touching Morties
 */
export const handleItemsTouchingItems = <
  RoomId extends string,
  RoomItemId extends string,
>(
  e: ItemTouchEvent<RoomId, RoomItemId>,
) => {
  // if the player moved into something, we handle that:
  if (movingItemIsPlayable(e)) {
    handlePlayerTouchingItem(e);
  }

  // if something moved into the player, we flip it and handle like the player moved into it:
  if (touchedItemIsPlayable(e)) {
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
    (movingItemIsType(e, "monster") && touchedItemIsType(e, "firedDoughnut")) ||
    (movingItemIsType(e, "firedDoughnut") && touchedItemIsType(e, "monster"))
  ) {
    handleFiredDoughnutTouchingMonster(e);
  }

  if (movingItemIsType(e, "monster") || movingItemIsType(e, "movableBlock")) {
    handleItemWithMovementTouchingItem(e);
  }

  if (touchedItemIsType(e, "switch")) {
    handleItemTouchingSwitch(e);
  }

  if (touchedItemIsType(e, "joystick")) {
    handleItemTouchingJoystick(e);
  }

  if (e.touchedItem.state.disappear) {
    handleItemTouchingDissapearing(e);
  }
  // is the thing that moved has disappearing (more unusual case but could be a powerup falling on player for example,
  // flip and treat like it is the thing that was touched):
  // this could even mean that the 'wall' touches a firedDoughnut when the doughnut (which is dissapearing on touch)
  // hits the wall
  if (
    e.movingItem.state.disappear &&
    // solid check: eg, firedDoughnuts don't disappear on touching the stopAutowalk in front of a door
    isSolid(e.touchedItem, e.movingItem)
  ) {
    handleItemTouchingDissapearing({
      ...e,
      movingItem: e.touchedItem,
      touchedItem: e.movingItem,
    });
  }
};
