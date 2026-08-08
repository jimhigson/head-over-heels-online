import { type WritableDeep } from "type-fest";

import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import { epsilon } from "../../utils/epsilon";
import { collisionsPriorityComparator } from "../physics/collisionsOrder";
import { type FreeItem, isSolid } from "../physics/itemPredicates";
import { type CollideableItem, collision2Items } from "./aabbCollision";
import { itemXyOverlapArea } from "./xyRectangleOverlap";

// avoid allocating memory by keeping two buffers to copy values into
// to run through the collision detection for standing on
const itemAboveBuffer: WritableDeep<CollideableItem> = {
  state: {
    box: {
      x: 0,
      y: 0,
      z: 0,
      xd: 0,
      yd: 0,
      zd: 0,
    },
  },
  id: "itemMaybeStanding",
};

// just the zero-volume top of itemMaybeBeingStoodOn:
const itemBelowBuffer: WritableDeep<CollideableItem> = {
  state: {
    box: {
      x: 0,
      y: 0,
      z: 0,
      xd: 0,
      yd: 0,
      zd: 0,
    },
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
  itemAboveBuffer.state.box.x = itemMaybeStanding.state.box.x;
  itemAboveBuffer.state.box.y = itemMaybeStanding.state.box.y;
  itemAboveBuffer.state.box.z = itemMaybeStanding.state.box.z - epsilon;
  itemAboveBuffer.state.box.xd = itemMaybeStanding.state.box.xd;
  itemAboveBuffer.state.box.yd = itemMaybeStanding.state.box.yd;
  itemAboveBuffer.state.box.zd = zOverlapAllowed + epsilon;

  // zero-volume top of the below item:
  itemBelowBuffer.state.box.x = itemMaybeBeingStoodOn.state.box.x;
  itemBelowBuffer.state.box.y = itemMaybeBeingStoodOn.state.box.y;
  itemBelowBuffer.state.box.z =
    itemMaybeBeingStoodOn.state.box.z + itemMaybeBeingStoodOn.state.box.zd;
  itemBelowBuffer.state.box.xd = itemMaybeBeingStoodOn.state.box.xd;
  itemBelowBuffer.state.box.yd = itemMaybeBeingStoodOn.state.box.yd;
  itemBelowBuffer.state.box.zd = 0; // zero volume

  // check for collisions of a box representing just the top of one item
  // and just the bottom of the other
  return collision2Items(itemAboveBuffer, itemBelowBuffer);
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
  const potentiallyStoodOn = Iterator.from(itemsMaybeBeingStoodOn).filter((i) =>
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
