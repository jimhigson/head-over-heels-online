import type { GameState } from "@/game/gameState/GameState";
import type { PlayableItem, UnknownItemInPlay } from "@/model/ItemInPlay";
import type { Xyz } from "@/utils/vectors";
import { handlePlayerTouchingDeadly } from "./handlePlayerTouchingDeadly";
import {
  handlePlayerTouchingPickup,
  handlePlayerTouchingDisappearing,
} from "./handlePlayerTouchingPickup";
import { handlePlayerTouchingPortal } from "./handlePlayerTouchingPortal";
import { handlePlayerTouchingDoorFrame } from "./handlePlayerTouchingDoorFrame";

/**
 * @returns true is the physics needs to halt after this handler
 */
export const handlePlayerTouchingItems = <RoomId extends string>(
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
