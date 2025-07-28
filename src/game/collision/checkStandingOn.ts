import type { FreeItem } from "../physics/itemPredicates";
import { isSolid } from "../physics/itemPredicates";
import { itemXyOverlapArea } from "./xyRectangleOverlap";
import { collisionsPriorityComparator } from "../physics/collisionsOrder";
import type { UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import { iterate } from "../../utils/iterate";
import { addXyz } from "../../utils/vectors/vectors";
import { epsilon } from "../../utils/epsilon";
import { collision1to1 } from "./aabbCollision";

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

  // check for collisions of a box representing just the top of one item
  // and just the bottom of the other
  return collision1to1(
    // just the bottom of item:
    {
      state: {
        position: addXyz(itemMaybeStanding.state.position, {
          x: 0,
          y: 0,
          z: -epsilon,
        }),
      },
      aabb: { ...itemMaybeStanding.aabb, z: zOverlapAllowed + epsilon },
      id: itemMaybeStanding.id,
    },

    // just the zero-volume top of itemMaybeBeingStoodOn:
    {
      state: {
        position: addXyz(itemMaybeBeingStoodOn.state.position, {
          x: 0,
          y: 0,
          z: itemMaybeBeingStoodOn.aabb.z,
        }),
      },
      aabb: { ...itemMaybeBeingStoodOn.aabb, z: 0 },
      id: itemMaybeBeingStoodOn.id,
    },
  );

  /*
  might need to check the mtv?
  const potentiallyPickupable = collisions.filter(
    (col) =>
      mtv(
        positionSlightlyBelowHeels,
        heelsItem.aabb,
        col.state.position,
        col.aabb,
      ).z > 0,
  );
  */
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
