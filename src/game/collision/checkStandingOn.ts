import { collision1to1 } from "@/game/collision/aabbCollision";
import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import type { FreeItem } from "../physics/itemPredicates";
import type { PlanetName } from "@/sprites/planets";
import { addXyz } from "@/utils/vectors/vectors";
import { isSolid } from "../physics/itemPredicates";
import { iterate } from "@/utils/iterate";
import { itemXyOverlapArea } from "./xyRectangleOverlap";
import { collisionsPriorityComparator } from "../physics/collisionsOrder";

const standingTolerance = 0.001;

export const checkStandingOn = <RoomId extends string>(
  item: FreeItem<PlanetName, RoomId>,
  itemMaybeBeingStoodOn: UnknownItemInPlay<RoomId>,
  progression: number,
): boolean => {
  if (!isSolid(itemMaybeBeingStoodOn, progression)) {
    return false;
  }

  if (item.id === itemMaybeBeingStoodOn.id) {
    return false; // an item can't be stood on itself
  }

  const {
    state: {
      position,
      vels: {
        gravity: { z: gravityVelZ },
      },
    },
    aabb,
    id,
  } = item;

  if (gravityVelZ > 0) {
    // we're jumping and can't be standing on anything while travelling upwards
    return false;
  }

  const positionJustBelowItem = addXyz(position, { z: -standingTolerance });

  return collision1to1(
    {
      state: { position: positionJustBelowItem },
      aabb,
      id,
    },
    itemMaybeBeingStoodOn,
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
  Item extends UnknownItemInPlay<RoomId>,
>(
  item: FreeItem<PlanetName, RoomId>,
  itemsMaybeBeingStoodOn: Iterable<Item>,
  progression: number,
): Item | undefined => {
  const potentiallyStoodOn = iterate(itemsMaybeBeingStoodOn).filter((i) =>
    checkStandingOn(item, i, progression),
  );

  const potentiallyStoodOnArray = [...potentiallyStoodOn];

  const itemWithMaxOverlap =
    potentiallyStoodOnArray.length === 0 ?
      undefined
    : potentiallyStoodOnArray.reduce((ac, iCol) => {
        const priorityComparison = collisionsPriorityComparator(iCol, ac);

        if (priorityComparison > 0) {
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
