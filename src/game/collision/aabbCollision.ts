import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import { iterate } from "@/utils/iterate";
import type { Xyz } from "@/utils/vectors/vectors";
import { axesXyz } from "@/utils/vectors/vectors";

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
  for (const axis of axesXyz) {
    if (
      posA[axis] + bbA[axis] <= posB[axis] ||
      posA[axis] >= posB[axis] + bbB[axis]
    ) {
      return false;
    }
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
