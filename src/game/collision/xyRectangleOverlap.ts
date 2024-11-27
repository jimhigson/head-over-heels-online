import type { AnyItemInPlay } from "@/model/ItemInPlay";
import type { Xy } from "@/utils/vectors/vectors";

export const xyRectangleOverlapArea = (
  pos1: Xy,
  bb1: Xy,
  pos2: Xy,
  bb2: Xy,
): number => {
  const overlapX = Math.max(
    0,
    Math.min(pos1.x + bb1.x, pos2.x + bb2.x) - Math.max(pos1.x, pos2.x),
  );
  const overlapY = Math.max(
    0,
    Math.min(pos1.y + bb1.y, pos2.y + bb2.y) - Math.max(pos1.y, pos2.y),
  );
  return overlapX * overlapY;
};

/** 1 for completely overlapping, 0.1 for hardly overlapping, 0 for not at all as a proportion of the first item */
export const itemXyOverlapArea = (
  { state: { position: pos1 }, aabb: bb1 }: AnyItemInPlay,
  { state: { position: pos2 }, aabb: bb2 }: AnyItemInPlay,
): number => {
  return xyRectangleOverlapArea(pos1, bb1, pos2, bb2);
};

/** 1 for completely overlapping, 0.1 for hardly overlapping, 0 for not at all as a proportion of the first item */
export const itemXyOverlapFraction = (
  referenceItem: AnyItemInPlay,
  comparisonItem: AnyItemInPlay,
): number => {
  return (
    itemXyOverlapArea(referenceItem, comparisonItem) /
    (referenceItem.aabb.x * referenceItem.aabb.y)
  );
};
