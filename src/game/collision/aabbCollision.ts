import { UnknownItemInPlay } from "@/model/ItemInPlay";
import { AxisXyz } from "@/utils/vectors";

type Collideable = Pick<UnknownItemInPlay, "position" | "aabb" | "id">;

/**
 * if items are *just* touching (bounding box max equal to other item's bb min)
 * it is considered a collision
 */
export const collision1to1 = (
  { aabb: bbA, position: posA }: Collideable,
  { aabb: bbB, position: posB }: Collideable,
  /** which axes to collide on - by default all */
  axes: AxisXyz[] = ["x", "y", "z"],
) => {
  for (const axis of axes) {
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

/** check for collisions between a single item and multiple others */
export const collision1toMany = (
  subject: Collideable,
  items: UnknownItemInPlay[],
  axes: AxisXyz[] = ["x", "y", "z"],
) => {
  return items.filter(
    (candidateItem) =>
      // prevent self- collision
      subject.id !== candidateItem.id &&
      collision1to1(subject, candidateItem, axes),
  );
};
