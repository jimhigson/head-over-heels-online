import type { WritableDeep } from "type-fest";

import type { UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import type { FreeItem } from "../physics/itemPredicates";
import type { Collideable } from "./aabbCollision";

import { epsilon } from "../../utils/epsilon";
import { iterate } from "../../utils/iterate";
import { collisionsPriorityComparator } from "../physics/collisionsOrder";
import { isSolid } from "../physics/itemPredicates";
import { collision1to1 } from "./aabbCollision";
import { itemXyOverlapArea } from "./xyRectangleOverlap";

// avoid allocating memory by keeping two buffers to copy values into
// to run through the collision detection for standing on
const itemAboveBuffer: WritableDeep<Collideable> = {
  state: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  aabb: {
    x: 0,
    y: 0,
    z: 0,
  },
  id: "itemMaybeStanding",
};

// just the zero-volume top of itemMaybeBeingStoodOn:
const itemBelowBuffer: WritableDeep<Collideable> = {
  state: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  aabb: {
    x: 0,
    y: 0,
    z: 0,
  },
  id: "itemMaybeBeingStoodOn",
};

export const spatiallyCheckStandingOn = <
  RoomId extends string,
  RoomItemId extends string,
>(
  itemMaybeStanding: FreeItem<RoomId, RoomItemId>,
  itemMaybeBeingStoodOn: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  /**
    How much overlap is ok? if not given, an epsilon value is used,
    which means to return true the bottom of @param item should equal
    the top of @param itemMaybeBeingStoodOn (negating floating point error).

    A value can be given if item moved in this frame, since they cover a range
    of values during the frame before they overlap it
  */
  zOverlapAllowed: number = 0.001,
): boolean => {
  if (!isSolid(itemMaybeBeingStoodOn, itemMaybeStanding)) {
    return false;
  }

  if (itemMaybeStanding.id === itemMaybeBeingStoodOn.id) {
    return false; // an item can't be stood on itself
  }

  const {
    state: {
      vels: {
        gravity: { z: gravityVelZ },
      },
    },
  } = itemMaybeStanding;

  if (gravityVelZ > 0) {
    // we're jumping and can't be standing on anything while travelling upwards
    return false;
  }

  // copy values into the above buffer to make an object representing just hte very bottom
  // of the item above (epsilon tall):
  itemAboveBuffer.state.position.x = itemMaybeStanding.state.position.x;
  itemAboveBuffer.state.position.y = itemMaybeStanding.state.position.y;
  itemAboveBuffer.state.position.z =
    itemMaybeStanding.state.position.z - epsilon;
  itemAboveBuffer.aabb.x = itemMaybeStanding.aabb.x;
  itemAboveBuffer.aabb.y = itemMaybeStanding.aabb.y;
  itemAboveBuffer.aabb.z = zOverlapAllowed + epsilon;

  // zero-volume top of the below item:
  itemBelowBuffer.state.position.x = itemMaybeBeingStoodOn.state.position.x;
  itemBelowBuffer.state.position.y = itemMaybeBeingStoodOn.state.position.y;
  itemBelowBuffer.state.position.z =
    itemMaybeBeingStoodOn.state.position.z + itemMaybeBeingStoodOn.aabb.z;
  itemBelowBuffer.aabb.x = itemMaybeBeingStoodOn.aabb.x;
  itemBelowBuffer.aabb.y = itemMaybeBeingStoodOn.aabb.y;
  itemBelowBuffer.aabb.z = 0; // zero volume

  // check for collisions of a box representing just the top of one item
  // and just the bottom of the other
  return collision1to1(itemAboveBuffer, itemBelowBuffer);
};

/**
 * find the stood on item with the most overlap out of those given, ignoring the previous
 * standingOn property (is not sticky)
 */
export const findStandingOnWithHighestPriorityAndMostOverlap = <
  RoomId extends string,
  RoomItemId extends string,
  Item extends UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
>(
  item: FreeItem<RoomId, RoomItemId>,
  itemsMaybeBeingStoodOn: Iterable<Item>,
): Item | undefined => {
  const potentiallyStoodOn = iterate(itemsMaybeBeingStoodOn).filter((i) =>
    spatiallyCheckStandingOn(item, i),
  );

  const potentiallyStoodOnArray = [...potentiallyStoodOn];

  const itemWithMaxOverlap =
    potentiallyStoodOnArray.length === 0 ?
      undefined
    : potentiallyStoodOnArray.reduce((ac, iCol) => {
        const priorityComparison = collisionsPriorityComparator(iCol, ac);

        if (priorityComparison < 0) {
          return iCol;
        }

        if (
          priorityComparison === 0 &&
          itemXyOverlapArea(item, iCol) > itemXyOverlapArea(item, ac)
        ) {
          return iCol;
        }
        return ac;
      });

  return itemWithMaxOverlap;
};
