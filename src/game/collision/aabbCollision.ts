import { UnknownItemInPlay } from "@/model/ItemInPlay";

export const collision1to1 = (
  { aabb: aabbA, position: { x: xA, y: yA, z: zA } }: UnknownItemInPlay,
  { aabb: aabbB, position: { x: xB, y: yB, z: zB } }: UnknownItemInPlay,
) => {
  if (aabbA === undefined || aabbB == undefined) {
    // if either item has no bounding box it is uncollisionable so no
    // collision is possible
    return false;
  }

  const { x: bbxA, y: bbyA, z: bbzA } = aabbA;
  const { x: bbxB, y: bbyB, z: bbzB } = aabbB;

  // Check for overlap in the x-axis first
  if (xA >= xB + bbxB || xA + bbxA <= xB) return false;

  // Check for overlap in the y-axis if x-axis overlap exists
  if (yA >= yB + bbyB || yA + bbyA <= yB) return false;

  // Check for overlap in the z-axis if x and y overlaps exist
  return !(zA >= zB + bbzB || zA + bbzA <= zB);
};

/** check for collisions between a single item and multiple others */
export const collision1toMany = (
  subject: UnknownItemInPlay,
  items: UnknownItemInPlay[],
) => {
  return items.filter(
    (candidateItem) =>
      subject !== candidateItem && collision1to1(subject, candidateItem),
  );
};
