import type { AnyItemInPlay } from "@/model/ItemInPlay";
import { type ItemInPlay } from "@/model/ItemInPlay";
import type { PortableItemType } from "../itemPredicates";
import { isPortable } from "../itemPredicates";
import { isFreeItem } from "../itemPredicates";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { addXyz } from "@/utils/vectors/vectors";
import { blockSizePx } from "@/sprites/spritePivots";
import { collision1toMany } from "@/game/collision/aabbCollision";
import type { RoomState } from "@/model/modelTypes";
import { objectValues } from "iter-tools";
import { moveItem } from "../moveItem";
import { iterate } from "@/utils/iterate";
import { findStandingOnWithHighestPriorityAndMostOverlap } from "@/game/collision/checkStandingOn";
import { deleteItemFromRoom } from "@/game/gameState/mutators/deleteItemFromRoom";
import type { CarriedItem } from "@/model/ItemStateMap";
import { addItemFromJsonToRoom } from "@/game/gameState/mutators/addItemToRoom";

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
    state: { carrying, position: heelsPosition, hasBag },
  } = heelsItem;

  if (!hasBag) {
    return;
  }

  const portableRoomItemsIter = iterate(objectValues(room.items)).filter(
    isPortable,
  );
  const itemToPickup =
    carrying === null ? findItemToPickup(heelsItem, room) : undefined;
  for (const portableItem of portableRoomItemsIter) {
    portableItem.state.wouldPickUpNext = false;
  }
  if (itemToPickup !== undefined) itemToPickup.state.wouldPickUpNext = true;

  if (inputState.carry) {
    if (carrying === null) {
      // trying to pick up
      if (itemToPickup === undefined) {
        console.warn("nothing to pick up");
        // nothing to pick up
        return;
      }

      pickUpItem(room, heelsItem, itemToPickup);
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

      const carryingItem = addItemFromJsonToRoom({
        gameState,
        room,
        itemType: carrying.type,
        config: carrying.config,
        position: heelsPosition,
      });

      moveItem({
        subjectItem: heelsItem,
        gameState,
        posDelta: {
          x: 0,
          y: 0,
          z: carryingItem.aabb.z,
        },
        pusher: heelsItem,
        forceful: true,
        deltaMS,
      });

      // don't set heels as standing on the put-down item - normal gravity and movement
      // will sort that out from the main loop

      // put down
      heelsItem.state.carrying = null;
    }
    inputState.carry = false; // handled this input
  }
};

const pickUpItem = <RoomId extends string, T extends PortableItemType>(
  room: RoomState<PlanetName, RoomId>,
  heelsItem: ItemInPlay<"heels", PlanetName, RoomId>,
  itemToPickup: ItemInPlay<T, PlanetName, RoomId>,
) => {
  const carrying = {
    type: itemToPickup.type,
    config: itemToPickup.config,
  } as CarriedItem<RoomId>;
  heelsItem.state.carrying = carrying;

  deleteItemFromRoom({ room, item: itemToPickup });
};

const findItemToPickup = <RoomId extends string>(
  heelsItem: ItemInPlay<"heels", PlanetName, RoomId>,
  room: RoomState<PlanetName, RoomId>,
) => {
  return findStandingOnWithHighestPriorityAndMostOverlap(
    heelsItem,
    iterate(objectValues(room.items)).filter(isPortable),
  );
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
