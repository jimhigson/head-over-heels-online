import {
  isPlayableItem,
  type PlayableItem,
  type UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { handlePlayerTouchingDeadly } from "./handlePlayerTouchingDeadly";
import {
  handlePlayerTouchingDisappearing,
  handlePlayerTouchingPickup,
} from "./handlePlayerTouchingPickup";
import { handlePlayerTouchingPortal } from "./handlePlayerTouchingPortal";
import type { Xyz } from "@/utils/vectors";
import type { GameState } from "@/game/gameState/GameState";
import { handlePlayerTouchingDoorFrame } from "./slideOnDoorFrames";

/**
 * @returns true is the physics needs to halt after this handler
 */
const handlePlayerTouchingItems = <RoomId extends string>(
  playableItem: PlayableItem<RoomId>,
  touchee: UnknownItemInPlay<RoomId>,
  movementVector: Xyz,
  gameState: GameState<RoomId>,
) => {
  switch (touchee.type) {
    case "baddie":
    case "deadly-block":
      if (handlePlayerTouchingDeadly<RoomId>(gameState, playableItem)) {
        return true;
      }
      break;
    case "floor":
      if (
        touchee.config.deadly &&
        handlePlayerTouchingDeadly<RoomId>(gameState, playableItem)
      )
        return true;
      break;
    case "portal":
      if (
        handlePlayerTouchingPortal(
          gameState,
          playableItem,
          touchee,
          movementVector,
        )
      ) {
        // has activated the portal:
        return true;
      }
      break;
    case "pickup":
      handlePlayerTouchingPickup(gameState, playableItem, touchee);
      break;
    case "fish":
      if (touchee.config.alive) {
        handlePlayerTouchingPickup(gameState, playableItem, touchee);
      } else {
        if (handlePlayerTouchingDeadly<RoomId>(gameState, playableItem)) {
          return true;
        }
      }
      break;
    case "doorFrame":
      if (
        handlePlayerTouchingDoorFrame(playableItem, movementVector, touchee)
      ) {
        return true;
      }
      break;
    case "block":
    case "barrier":
      if (touchee.config.disappearing) {
        handlePlayerTouchingDisappearing(gameState, playableItem, touchee);
      }
      break;
  }

  return false;
};

/**
 * some old - Morties touching Morties
 */
export const handleItemsTouchingItems = <RoomId extends string>({
  movingItem,
  movementVector,
  touchee,
  gameState,
}: {
  movingItem: UnknownItemInPlay<RoomId>;
  movementVector: Xyz;
  touchee: UnknownItemInPlay<RoomId>;
  gameState: GameState<RoomId>;
}): boolean => {
  if (
    isPlayableItem(movingItem) &&
    handlePlayerTouchingItems(movingItem, touchee, movementVector, gameState)
  )
    return true;

  if (
    isPlayableItem(touchee) &&
    handlePlayerTouchingItems(touchee, movingItem, movementVector, gameState)
  )
    return true;

  return false;
};
