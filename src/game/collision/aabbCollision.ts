import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import { iterate } from "@/utils/iterate";
import type { Xyz } from "@/utils/vectors/vectors";

export type Collideable = Pick<UnknownItemInPlay, "aabb" | "id"> & {
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

  if (posA.x + bbA.x <= posB.x || posA.x >= posB.x + bbB.x) {
    return false;
  }
  if (posA.y + bbA.y <= posB.y || posA.y >= posB.y + bbB.y) {
    return false;
  }
  if (posA.z + bbA.z <= posB.z || posA.z >= posB.z + bbB.z) {
    return false;
  }

  // If all axes overlap, return true for collision
  return true;
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
