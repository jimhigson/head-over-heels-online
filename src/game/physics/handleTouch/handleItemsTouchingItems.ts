import { type UnknownItemInPlay } from "@/model/ItemInPlay";
import { isItemType } from "../itemPredicates";
import { isPlayableItem } from "../itemPredicates";
import { type Xyz } from "@/utils/vectors/vectors";
import type { GameState } from "@/game/gameState/GameState";
import { handlePlayerTouchingItem } from "./handlePlayerTouchingItem";
import { handleBaddieTouchingItem } from "../mechanics/baddieAi";
import { handleItemTouchingSwitch } from "./handleItemTouchingSwitch";
import {
  handleItemTouchingSlidingItem,
  handleSlidingItemTouchingAnyItem,
} from "./handleItemTouchingSlidingItem";
import { isSlidingItem } from "../itemPredicates";
import { handlePlayerTouchingJoystick } from "./handlePlayerTouchingJoystick";

/**
 * some old - Morties touching Morties
 */
export const handleItemsTouchingItems = <RoomId extends string>({
  movingItem,
  movementVector,
  touchee,
  gameState,
  deltaMS,
}: {
  movingItem: UnknownItemInPlay<RoomId>;
  movementVector: Xyz;
  touchee: UnknownItemInPlay<RoomId>;
  gameState: GameState<RoomId>;
  deltaMS: number;
}): boolean => {
  if (
    isPlayableItem(movingItem) &&
    handlePlayerTouchingItem(
      movingItem,
      touchee,
      movementVector,
      gameState,
      deltaMS,
    )
  )
    return true;

  if (
    isPlayableItem(touchee) &&
    handlePlayerTouchingItem(
      touchee,
      movingItem,
      movementVector,
      gameState,
      deltaMS,
    )
  )
    return true;

  if (
    isSlidingItem(touchee) &&
    handleItemTouchingSlidingItem(touchee, movingItem, gameState)
  ) {
    return true;
  }

  if (
    isSlidingItem(movingItem) &&
    handleSlidingItemTouchingAnyItem(movingItem, touchee, gameState)
  ) {
    return true;
  }

  if (
    isItemType("baddie")(movingItem) &&
    handleBaddieTouchingItem(movingItem, touchee, movementVector, gameState)
  )
    return true;

  if (
    isItemType("switch")(touchee) &&
    handleItemTouchingSwitch(touchee, movingItem, movementVector, gameState)
  )
    return true;

  if (
    isItemType("joystick")(touchee) &&
    handlePlayerTouchingJoystick(gameState, movingItem, touchee, deltaMS)
  )
    return true;

  return false;
};
