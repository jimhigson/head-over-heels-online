import type { AnyItemInPlay } from "@/model/ItemInPlay";
import { type ItemInPlay } from "@/model/ItemInPlay";
import { isItemType, isPortable } from "../itemPredicates";
import { isFreeItem } from "../itemPredicates";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { addXyz } from "@/utils/vectors/vectors";
import { blockSizePx } from "@/sprites/spritePivots";
import { collision1toMany } from "@/game/collision/aabbCollision";
import type { RoomState } from "@/model/modelTypes";
import { objectValues } from "iter-tools";
import { moveItem } from "../moveItem";
import { itemXyOverlapArea } from "@/game/collision/xyRectangleOverlap";
import { mtv } from "../slidingCollision";
import { iterate } from "@/utils/iterate";

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
      if (
        // can't pick up while falling (or not standing on anything)
        itemToPickup === undefined ||
        // can only pick up these item types
        !isItemType("portableBlock", "spring")(itemToPickup)
      ) {
        return;
      }

      itemToPickup.state.unsolidAfterProgression = -1;

      heelsItem.state.carrying = itemToPickup;
      heelsItem.state.standingOn = null;
      for (const standingOnPickedUp of itemToPickup.state.stoodOnBy) {
        standingOnPickedUp.state.standingOn = null;
      }
      itemToPickup.state.stoodOnBy.clear();
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

const findItemToPickup = <RoomId extends string>(
  heelsItem: ItemInPlay<"heels", PlanetName, RoomId>,
  room: RoomState<PlanetName, RoomId>,
) => {
  const positionSlightlyBelowHeels = addXyz(heelsItem.state.position, {
    z: -0.001,
  });

  const portableRoomItemsIter = iterate(objectValues(room.items)).filter(
    isPortable,
  );
  const collisions = collision1toMany(
    {
      id: heelsItem.id,
      aabb: heelsItem.aabb,
      state: { position: positionSlightlyBelowHeels },
    },
    portableRoomItemsIter,
  );
  const potentiallyPickupable = collisions.filter(
    (col) =>
      mtv(
        positionSlightlyBelowHeels,
        heelsItem.aabb,
        col.state.position,
        col.aabb,
      ).z > 0,
  );

  const itemWithMaxOverlap =
    potentiallyPickupable.length === 0 ?
      undefined
    : potentiallyPickupable.reduce((ac, iCol) => {
        if (
          itemXyOverlapArea(heelsItem, iCol) > itemXyOverlapArea(heelsItem, ac)
        ) {
          return iCol;
        } else return ac;
      });

  return itemWithMaxOverlap;
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
