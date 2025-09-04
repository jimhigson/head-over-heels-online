import type { UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import type { Xyz } from "../../utils/vectors/vectors";
import type { GridSpatialIndex } from "../physics/gridSpace/GridSpatialIndex";

import { always } from "../../utils/always";

export type Collideable = Pick<UnionOfAllItemInPlayTypes, "aabb" | "id"> & {
  state: { position: Xyz };
};

/**
 * if items are *just* touching (bounding box max equal to other item's bb min)
 * it is considered a collision
 */
export const collision1to1 = (
  { aabb: bbA, state: { position: posA } }: Collideable,
  { aabb: bbB, state: { position: posB } }: Collideable,
) => {
  // more elegant, but slower (and this is a bottleneck for scripting)
  // for (const axis of axesXyz) {
  //   if (
  //     posA[axis] + bbA[axis] <= posB[axis] ||
  //     posA[axis] >= posB[axis] + bbB[axis]
  //   ) {
  //     return false;
  //   }
  // }

  return (
    !(posA.x + bbA.x <= posB.x || posA.x >= posB.x + bbB.x) &&
    !(posA.y + bbA.y <= posB.y || posA.y >= posB.y + bbB.y) &&
    !(posA.z + bbA.z <= posB.z || posA.z >= posB.z + bbB.z)
  );
};

/**
 * Check for collisions between a single item and multiple others.
 *
 * Like collision1toMany but an iterator
 *
 * @deprecated - does not use the spatial index
 */
export function* collision1toManyIter<C extends Collideable>(
  subject: Collideable,
  items: Iterable<C>,
): Generator<C> {
  for (const candidateItem of items) {
    if (
      // prevent self- collision
      subject.id !== candidateItem.id &&
      collision1to1(subject, candidateItem)
    ) {
      yield candidateItem;
    }
  }
}

/**
 * Check for collisions between a single item and multiple others, using the spatial index
 * so that the function scales well as number of items grows
 */
export function* collisionItemWithIndex<C extends Collideable>(
  subject: Collideable,
  index: GridSpatialIndex<string, string, C>,
  considerItem: (item: C) => boolean = always,
): Generator<C> {
  for (const candidateItem of index
    .iterateItemCuboidNeighbourhood(subject)
    .filter(considerItem)) {
    if (
      // prevent self- collision
      subject.id !== candidateItem.id &&
      collision1to1(subject, candidateItem)
    ) {
      yield candidateItem;
    }
  }
}
