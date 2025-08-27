import type { UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import type { Xyz } from "../../utils/vectors/vectors";

import { iterate } from "../../utils/iterate";

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
 * check for collisions between a single item and multiple others
 */
export const collision1toMany = <C extends Collideable>(
  subject: Collideable,
  items: Iterable<C>,
): Array<C> => {
  return [
    ...iterate(items).filter(
      (candidateItem) =>
        // prevent self- collision
        subject.id !== candidateItem.id &&
        collision1to1(subject, candidateItem),
    ),
  ];
};

/**
 * Check for collisions between a single item and multiple others.
 *
 * Like collision1toMany but an iterator
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
