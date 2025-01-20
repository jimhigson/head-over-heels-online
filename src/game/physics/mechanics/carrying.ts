import type { PlayableItem, PortableItemType } from "../itemPredicates";
import { isPortable } from "../itemPredicates";
import { isFreeItem } from "../itemPredicates";
import { objectValues } from "iter-tools";
import { moveItem } from "../moveItem";
import type { ItemInPlay, AnyItemInPlay } from "../../../model/ItemInPlay";
import type { HeelsAbilities, CarriedItem } from "../../../model/ItemStateMap";
import type { RoomState } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import { blockSizePx } from "../../../sprites/spritePivots";
import { iterate } from "../../../utils/iterate";
import { addXyz } from "../../../utils/vectors/vectors";
import { collision1toMany } from "../../collision/aabbCollision";
import { findStandingOnWithHighestPriorityAndMostOverlap } from "../../collision/checkStandingOn";
import type { GameState } from "../../gameState/GameState";
import { addItemFromJsonToRoom } from "../../gameState/mutators/addItemToRoom";
import { deleteItemFromRoom } from "../../gameState/mutators/deleteItemFromRoom";

/**
 * walking, but also gliding and changing direction mid-air
 */
export const carrying = <RoomId extends string>(
  carrier: PlayableItem<"heels" | "headOverHeels", RoomId>,
  room: RoomState<SceneryName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): undefined => {
  const { inputState } = gameState;

  const heelsAbilities =
    carrier.type === "heels" ? carrier.state : carrier.state.heels;

  const { carrying, hasBag } = heelsAbilities;
  const {
    state: { position: carrierPosition },
  } = carrier;

  if (!hasBag) {
    return;
  }

  const portableRoomItemsIter = iterate(objectValues(room.items)).filter(
    isPortable,
  );
  const itemToPickup =
    carrying === null ? findItemToPickup(carrier, room) : undefined;
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

      pickUpItem(room, heelsAbilities, itemToPickup);
    } else {
      // trying to put down
      if (carrier.state.standingOn === null) {
        // can't put down mid-air
        return;
      }

      // check if there is space above heels (and any items standing on heels):
      // really the ideal here would be do the move and roll back if ti can't be done.
      // that would need a stateless/reducer based approach to updating the world
      if (!checkSpaceAvailableToPutDown(carrier, objectValues(room.items))) {
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
      });

      // don't set heels as standing on the put-down item - normal gravity and movement
      // will sort that out from the main loop

      // put down
      heelsAbilities.carrying = null;
    }
    inputState.carry = false; // handled this input
  }
};

const pickUpItem = <RoomId extends string, T extends PortableItemType>(
  room: RoomState<SceneryName, RoomId>,
  heelsAbilities: HeelsAbilities<RoomId>,
  itemToPickup: ItemInPlay<T, SceneryName, RoomId>,
) => {
  const carrying = {
    type: itemToPickup.type,
    config: itemToPickup.config,
  } as CarriedItem<RoomId>;
  heelsAbilities.carrying = carrying;

  deleteItemFromRoom({ room, item: itemToPickup });
};

const findItemToPickup = <RoomId extends string>(
  carrier: PlayableItem<"heels" | "headOverHeels", RoomId>,
  room: RoomState<SceneryName, RoomId>,
) => {
  return findStandingOnWithHighestPriorityAndMostOverlap(
    carrier,
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
