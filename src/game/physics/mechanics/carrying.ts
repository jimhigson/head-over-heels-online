import type { PlayableItem, PortableItemType } from "../itemPredicates";
import { isPortable, isSolid } from "../itemPredicates";
import { isFreeItem } from "../itemPredicates";
import { moveItem } from "../moveItem";
import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { HeelsAbilities, CarriedItem } from "../../../model/ItemStateMap";
import { blockSizePx } from "../../../sprites/spritePivots";
import { addXyz } from "../../../utils/vectors/vectors";
import { collision1toMany } from "../../collision/aabbCollision";
import { findStandingOnWithHighestPriorityAndMostOverlap } from "../../collision/checkStandingOn";
import type { GameState } from "../../gameState/GameState";
import { addItemFromJsonToRoom } from "../../gameState/mutators/addItemToRoom";
import { deleteItemFromRoom } from "../../gameState/mutators/deleteItemFromRoom";
import { handleItemsTouchingItems } from "../handleTouch/handleItemsTouchingItems";
import {
  iterateRoomItems,
  roomItemsIterable,
  type RoomState,
} from "../../../model/RoomState";
import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";

/**
 * walking, but also gliding and changing direction mid-air
 */
export const carrying = <RoomId extends string, RoomItemId extends string>(
  carrier: PlayableItem<"heels" | "headOverHeels", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): undefined => {
  const { inputStateTracker } = gameState;

  const heelsAbilities =
    carrier.type === "heels" ? carrier.state : carrier.state.heels;

  const { carrying, hasBag } = heelsAbilities;
  const {
    state: { position: carrierPosition },
  } = carrier;

  if (!hasBag) {
    return;
  }

  const portableRoomItemsIter = iterateRoomItems(room.items).filter(isPortable);
  const itemToPickup =
    carrying === null ? findItemToPickup(carrier, room) : undefined;
  for (const portableItem of portableRoomItemsIter) {
    portableItem.state.wouldPickUpNext = false;
  }
  if (itemToPickup !== undefined) itemToPickup.state.wouldPickUpNext = true;

  if (inputStateTracker.currentActionPress("carry") === "tap") {
    if (carrying === null) {
      // trying to pick up
      if (itemToPickup === undefined) {
        console.warn("nothing to pick up");
        // nothing to pick up
        return;
      }

      pickUpItem(room, heelsAbilities, itemToPickup);
    } else {
      // trying to put down
      if (carrier.state.standingOnItemId === null) {
        // can't put down mid-air
        return;
      }

      // check if there is space above heels (and any items standing on heels):
      // really the ideal here would be do the move and roll back if ti can't be done.
      // that would need a stateless/reducer based approach to updating the world
      if (
        !checkSpaceAvailableToPutDown(carrier, roomItemsIterable(room.items))
      ) {
        return;
      }

      const carryingItem = addItemFromJsonToRoom({
        gameState,
        room,
        itemType: carrying.type,
        config: carrying.config,
        position: carrierPosition,
      });

      // move the player up on top of the item they just put down:
      moveItem({
        subjectItem: carrier,
        gameState,
        room,
        posDelta: {
          x: 0,
          y: 0,
          z: carryingItem.aabb.z,
        },
        pusher: carrier,
        forceful: true,
        deltaMS,
        onTouch: handleItemsTouchingItems,
      });

      // don't set heels as standing on the put-down item - normal gravity and movement
      // will sort that out from the main loop

      // put down
      heelsAbilities.carrying = null;
    }
  }
};

const pickUpItem = <
  T extends PortableItemType,
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  heelsAbilities: HeelsAbilities<RoomId>,
  itemToPickup: ItemTypeUnion<T, RoomId, RoomItemId>,
) => {
  const carrying = {
    type: itemToPickup.type,
    config: itemToPickup.config,
  } as CarriedItem<RoomId>;
  heelsAbilities.carrying = carrying;

  deleteItemFromRoom({ room, item: itemToPickup });
};

export const findItemToPickup = <
  RoomId extends string,
  RoomItemId extends string,
>(
  carrier: PlayableItem<"heels" | "headOverHeels", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
) => {
  return findStandingOnWithHighestPriorityAndMostOverlap(
    carrier,
    iterateRoomItems(room.items).filter(isPortable),
  );
};

export const checkSpaceAvailableToPutDown = <
  T extends UnionOfAllItemInPlayTypes,
>(
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
    if (!isSolid(collision, item)) {
      continue;
    }

    if (!isFreeItem(collision)) {
      console.log(
        "carrying: cannot put down due to collision: item:",
        item,
        "can't move up because it would collide with non-free",
        collision,
      );
      return false;
    }

    if (!checkSpaceAvailableToPutDown(collision, roomItems)) {
      console.log(
        "carrying: cannot put down due to collision: item:",
        item,
        "can't move up because it would collide with free that has nowhere to go:",
        collision,
      );

      return false;
    }
  }

  return true;
};
