import { UnknownItemInPlay } from "@/model/ItemInPlay";

export const collision1to1 = (
  { aabb: bbA, position: { x: xA, y: yA, z: zA } }: UnknownItemInPlay,
  { aabb: bbB, position: { x: xB, y: yB, z: zB } }: UnknownItemInPlay,
) => {
  if (bbA === undefined || bbB == undefined) {
    // if either item has no bounding box it is uncollisionable so no
    // collision is possible
    return false;
  }
  const { x: bbxA, y: bbyA, z: bbzA } = bbA;
  const { x: bbxB, y: bbyB, z: bbzB } = bbB;

  // Calculate x-axis bounds for both items
  const minXA = Math.min(xA, xA + bbxA);
  const maxXA = Math.max(xA, xA + bbxA);
  const minXB = Math.min(xB, xB + bbxB);
  const maxXB = Math.max(xB, xB + bbxB);

  // Check for x-axis overlap
  if (maxXA <= minXB || minXA >= maxXB) return false;

  // Calculate y-axis bounds for both items
  const minYA = Math.min(yA, yA + bbyA);
  const maxYA = Math.max(yA, yA + bbyA);
  const minYB = Math.min(yB, yB + bbyB);
  const maxYB = Math.max(yB, yB + bbyB);

  // Check for y-axis overlap
  if (maxYA <= minYB || minYA >= maxYB) return false;

  // Calculate z-axis bounds for both items
  const minZA = Math.min(zA, zA + bbzA);
  const maxZA = Math.max(zA, zA + bbzA);
  const minZB = Math.min(zB, zB + bbzB);
  const maxZB = Math.max(zB, zB + bbzB);

  // Check for z-axis overlap
  return maxZA > minZB && minZA < maxZB;
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
