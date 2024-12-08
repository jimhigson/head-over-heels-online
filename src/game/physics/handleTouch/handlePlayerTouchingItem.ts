import type { GameState } from "@/game/gameState/GameState";
import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import type { PlayableItem } from "../itemPredicates";
import type { Xyz } from "@/utils/vectors/vectors";
import { handlePlayerTouchingDeadly } from "./handlePlayerTouchingDeadly";
import {
  handlePlayerTouchingPickup,
  handlePlayerTouchingDisappearing,
} from "./handlePlayerTouchingPickup";
import { handlePlayerTouchingPortal } from "./handlePlayerTouchingPortal";
import { handlePlayerTouchingDoorFrame } from "./handlePlayerTouchingDoorFrame";
import { handlePlayerTouchingStopAutowalk } from "./handlePlayerTouchingStopAutowalk";
import type { CharacterName } from "@/model/modelTypes";

/**
 * @returns true is the physics needs to halt after this handler
 */
export const handlePlayerTouchingItem = <RoomId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId>,
  touchee: UnknownItemInPlay<RoomId>,
  movementVector: Xyz,
  gameState: GameState<RoomId>,
  _deltaMS: number,
) => {
  switch (touchee.type) {
    case "stopAutowalk":
      if (handlePlayerTouchingStopAutowalk<RoomId>(gameState, playableItem)) {
        return true;
      }
      break;
    case "baddie":
    case "deadlyBlock":
    case "moveableDeadly":
    case "slidingDeadly":
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
        // has activated the portal - halt all physics:
        return true;
      }
      break;
    case "pickup":
      handlePlayerTouchingPickup(gameState, playableItem, touchee);
      break;
    case "doorFrame":
      if (
        handlePlayerTouchingDoorFrame(playableItem, movementVector, touchee)
      ) {
        return true;
      }
      break;

    case "barrier":
      if (touchee.config.disappearing) {
        handlePlayerTouchingDisappearing(gameState, playableItem, touchee);
      }
      break;
    case "block":
      if (touchee.state.disappearing) {
        handlePlayerTouchingDisappearing(gameState, playableItem, touchee);
      }
      break;
  }

  return false;
};
