import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import { iterate } from "@/utils/iterate";
import type { Xyz } from "@/utils/vectors";
import { axesXyz } from "@/utils/vectors";

export type Collideable = Pick<UnknownItemInPlay, "aabb" | "id"> & {
  state: { position: Xyz };
};

/**
 * calculate the Minimum Translation Vector (MTV) to keep a moving item out of a static one.
 *
 * This movement will be along a single axis - whichever is the least to
 * reconcile the collision. Ie, move the moving item so that it is no longer
 * inside the static one
 */
/*export const slidingCollision = (
  { aabb: aBB, position: aPos }: Collideable,
  { aabb: bBB, position: bPos }: Collideable,
) => {
  const mtv = { ...originXyz };
  //const smallestAxis: AxisXyz = "x";

  for (const axis of ["x", "y", "z"] as AxisXyz[]) {
    const aMin = aPos[axis];
    const aMax = aPos[axis] + aBB[axis];
    const bMin = bPos[axis];
    const bMax = bPos[axis] + bBB[axis];

    const dx1 = bMax - aMin; // overlap on left/front/bottom side
    const dx2 = aMax - bMin; // overlap on right/back/top side

    const mtvAxis = Math.abs(dx1) < Math.abs(dx2) ? dx1 : -dx2;
  }

  return mtv; 
};
*/

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
export const collision1toMany = <RoomId extends string>(
  subject: Collideable,
  items: Iterable<UnknownItemInPlay<RoomId>>,
): Array<UnknownItemInPlay<RoomId>> => {
  return [
    ...iterate(items).filter(
      (candidateItem) =>
        // prevent self- collision
        subject.id !== candidateItem.id &&
        collision1to1(subject, candidateItem),
    ),
  ];
};
