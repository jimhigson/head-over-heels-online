import type { AnyItemInPlay } from "@/model/ItemInPlay";
import { type ItemInPlay } from "@/model/ItemInPlay";
import { isItemType } from "../itemPredicates";
import { isFreeItem } from "../itemPredicates";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { addXyz } from "@/utils/vectors/vectors";
import { blockSizePx } from "@/sprites/spritePivots";
import { collision1toMany } from "@/game/collision/aabbCollision";
import type { RoomState } from "@/model/modelTypes";
import { objectValues } from "iter-tools";
import { moveItem } from "../moveItem";

/**
 * walking, but also gliding and changing direction mid-air
 */
export const carrying = <RoomId extends string>(
  heelsItem: ItemInPlay<"heels", PlanetName, RoomId>,
  room: RoomState<PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): undefined => {
  const { inputState } = gameState;
  const {
    state: { carrying, standingOn, position: heelsPosition, hasBag },
  } = heelsItem;

  if (!hasBag) {
    return;
  }

  if (inputState.carry) {
    if (carrying === null) {
      // trying to pick up
      if (
        // can't pick up while falling (or not standing on anything)
        standingOn === null ||
        // can only pick up these item types
        !isItemType("portableBlock", "spring")(standingOn)
      ) {
        return;
      }

      standingOn.state.unsolidAfterProgression = -1;

      heelsItem.state.carrying = standingOn;
      heelsItem.state.standingOn = null;
      for (const standingOnPickedUp of standingOn.state.stoodOnBy) {
        standingOnPickedUp.state.standingOn = null;
      }
      standingOn.state.stoodOnBy.clear();
      inputState.carry = false; // handled this input
    } else {
      // trying to put down
      if (heelsItem.state.standingOn === null) {
        // can't put down mid-air
        return;
      }

      // check if there is space above heels (and any items standing on heels):
      // really the ideal here would be do the move and roll back if ti can't be done.
      // that would need a stateless/reducer based approach to updating the world
      if (!checkSpaceAvailableToPutDown(heelsItem, objectValues(room.items))) {
        return;
      }

      carrying.state.position = heelsPosition;
      carrying.state.unsolidAfterProgression = null;

      moveItem({
        subjectItem: heelsItem,
        gameState,
        posDelta: {
          x: 0,
          y: 0,
          z: carrying.aabb.z,
        },
        pusher: heelsItem,
        forceful: true,
        deltaMS,
      });

      // don't set heels as standing on the put-down item - normal gravity and movement
      // will sort that out from the main loop

      // put down
      heelsItem.state.carrying = null;
      inputState.carry = false; // handled this input
    }
  }
};

export const checkSpaceAvailableToPutDown = <T extends AnyItemInPlay>(
  item: T,
  roomItems: Iterable<T>,
) => {
  const positionNeedingToMoveInto = {
    position: addXyz(item.state.position, { z: blockSizePx.h }),
  };

  const collisions = collision1toMany(
    {
      id: item.id,
      aabb: item.aabb,
      state: positionNeedingToMoveInto,
    },
    roomItems,
  );

  for (const collision of collisions) {
    if (!isFreeItem(collision)) {
      return false;
    }

    if (!checkSpaceAvailableToPutDown(collision, roomItems)) {
      return false;
    }
  }

  return true;
};
