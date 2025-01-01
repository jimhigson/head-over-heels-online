import type { AnyItemInPlay } from "@/model/ItemInPlay";
import { type ItemInPlay } from "@/model/ItemInPlay";
import type { PlayableItem, PortableItemType } from "../itemPredicates";
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
import type { CarriedItem, HeelsAbilities } from "@/model/ItemStateMap";
import { addItemFromJsonToRoom } from "@/game/gameState/mutators/addItemToRoom";

/**
 * walking, but also gliding and changing direction mid-air
 */
export const carrying = <RoomId extends string>(
  carrier: PlayableItem<"heels" | "headOverHeels", RoomId>,
  room: RoomState<PlanetName, RoomId>,
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
  room: RoomState<PlanetName, RoomId>,
  heelsAbilities: HeelsAbilities<RoomId>,
  itemToPickup: ItemInPlay<T, PlanetName, RoomId>,
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
  room: RoomState<PlanetName, RoomId>,
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
