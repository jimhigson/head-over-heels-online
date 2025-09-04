import { produce } from "immer";

import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { HeelsAbilities } from "../../../model/ItemStateMap";
import type { GameState } from "../../gameState/GameState";
import type { GridSpatialIndex } from "../gridSpace/GridSpatialIndex";
import type { PlayableItem, PortableItem } from "../itemPredicates";

import {
  iterateRoomItems,
  roomSpatialIndexKey,
  type RoomState,
} from "../../../model/RoomState";
import { blockSizePx } from "../../../sprites/spritePivots";
import { always } from "../../../utils/always";
import { addXyz } from "../../../utils/vectors/vectors";
import { collisionItemWithIndex } from "../../collision/aabbCollision";
import { findStandingOnWithHighestPriorityAndMostOverlap } from "../../collision/checkStandingOn";
import { playableHasShield } from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";
import { deleteItemFromRoom } from "../../gameState/mutators/deleteItemFromRoom";
import { handleItemsTouchingItems } from "../handleTouch/handleItemsTouchingItems";
import { isDeadly, isPortable, isSolid } from "../itemPredicates";
import { isFreeItem } from "../itemPredicates";
import { moveItem } from "../moveItem";

/**
 * walking, but also gliding and changing direction mid-air
 */
export const carrying = <RoomId extends string, RoomItemId extends string>(
  carrier: PlayableItem<"headOverHeels" | "heels", RoomId, RoomItemId>,
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

  // update marking items as the next to pick up, for the sake of the green outline:
  for (const portableItem of portableRoomItemsIter) {
    portableItem.state.wouldPickUpNext = false;
  }
  if (itemToPickup !== undefined) itemToPickup.state.wouldPickUpNext = true;

  const currentCarryPress = inputStateTracker.currentActionPress("carry");
  const hasCarryInput =
    // usually we don't want to handle carrying on hold, otherwise heels picks up one frame
    // and puts down the next.
    currentCarryPress === "tap" ||
    // however, while pressing jump and carry is the exception - you can land on a block,
    // pick it up an jump off all at once:
    (inputStateTracker.currentActionPress("jump") === "hold" &&
      currentCarryPress === "hold");

  if (hasCarryInput) {
    if (carrying === null) {
      // trying to pick up
      if (itemToPickup === undefined) {
        // nothing to pick up
        return;
      }

      pickUpItem(room, heelsAbilities, itemToPickup);

      // won't carry again until key is released and re-pressed - prevents
      // multiple pickup/putdown in one tick with multiple sub-ticks
      inputStateTracker.actionsHandled.add("carry");
    } else {
      // trying to put down
      if (carrier.state.standingOnItemId === null) {
        // can't put down mid-air
        return;
      }

      // check if there is space above heels (and any items standing on heels):
      // really the ideal here would be do the move and roll back if ti can't be done.
      // that would need a stateless/reducer based approach to updating the world
      if (!checkSpaceAvailableToPutDown(carrier, room[roomSpatialIndexKey])) {
        return;
      }

      addItemToRoom({
        room,
        item: carrying,
        atPosition: carrierPosition,
      });

      // move the player up on top of the item they just put down:
      moveItem({
        subjectItem: carrier,
        gameState,
        room,
        posDelta: {
          x: 0,
          y: 0,
          z: carrying.aabb.z,
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

      inputStateTracker.actionsHandled.add("carry");
    }
  }
};

const pickUpItem = <RoomId extends string, RoomItemId extends string>(
  room: RoomState<RoomId, RoomItemId>,
  heelsAbilities: HeelsAbilities<RoomId>,
  itemToCarry: PortableItem<RoomId, RoomItemId>,
) => {
  heelsAbilities.carrying = itemToCarry;

  itemToCarry.state.wouldPickUpNext = false;
  deleteItemFromRoom({ room, item: itemToCarry });
};

export const findItemToPickup = <
  RoomId extends string,
  RoomItemId extends string,
>(
  carrier: PlayableItem<"headOverHeels" | "heels", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
) => {
  const hasShield = playableHasShield(carrier);

  return findStandingOnWithHighestPriorityAndMostOverlap(
    carrier,
    iterateRoomItems(room.items)
      .filter(isPortable)
      // can only pick up deadly items if you have a shield:
      .filter(hasShield ? always : (i) => !isDeadly(i)),
  );
};

export const checkSpaceAvailableToPutDown = <
  T extends UnionOfAllItemInPlayTypes,
>(
  item: T,
  roomSpatialIndex: GridSpatialIndex,
) => {
  const itemCopyInProposedLocation = produce(item, () => {
    item.state.position = addXyz(item.state.position, { z: blockSizePx.h });
  });

  const collisions = collisionItemWithIndex(
    itemCopyInProposedLocation,
    roomSpatialIndex,
    // only check for collisions with solid items
    (otherItem) => isSolid(otherItem, item),
  );

  for (const collision of collisions) {
    if (!isFreeItem(collision)) {
      console.log(
        "carrying: cannot put down due to collision: item:",
        item,
        "can't move up because it would collide with non-free",
        collision,
      );
      return false;
    }

    if (!checkSpaceAvailableToPutDown(collision, roomSpatialIndex)) {
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
