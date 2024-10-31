import { UnknownItemInPlay } from "@/model/ItemInPlay";

type Collideable = Pick<UnknownItemInPlay, "position" | "aabb" | "id">;

/**
 * if items are *just* touching (bounding box max equal to other item's bb min)
 * it is considered a collision
 */
export const collision1to1 = (
  {
    aabb: { x: bbxA, y: bbyA, z: bbzA },
    position: { x: xA, y: yA, z: zA },
  }: Collideable,
  {
    aabb: { x: bbxB, y: bbyB, z: bbzB },
    position: { x: xB, y: yB, z: zB },
  }: Collideable,
) => {
  // Check for overlap on the x-axis
  if (xA + bbxA <= xB || xA >= xB + bbxB) return false;

  // Check for overlap on the y-axis
  if (yA + bbyA <= yB || yA >= yB + bbyB) return false;

  // Check for overlap on the z-axis
  if (zA + bbzA <= zB || zA >= zB + bbzB) return false;

  // If all axes overlap, return true for collision
  return true;
};

/** check for collisions between a single item and multiple others */
export const collision1toMany = (
  subject: Collideable,
  items: UnknownItemInPlay[],
) => {
  return items.filter(
    (candidateItem) =>
      // prevent self- collision
      subject.id !== candidateItem.id && collision1to1(subject, candidateItem),
  );
};
