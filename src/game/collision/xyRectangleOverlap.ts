import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import { type XyzBox } from "../../utils/vectors/vectors";

const xyRectangleOverlapArea = (
  box1: Readonly<XyzBox>,
  box2: Readonly<XyzBox>,
): number => {
  const overlapX = Math.max(
    0,
    Math.min(box1.x + box1.xd, box2.x + box2.xd) - Math.max(box1.x, box2.x),
  );
  const overlapY = Math.max(
    0,
    Math.min(box1.y + box1.yd, box2.y + box2.yd) - Math.max(box1.y, box2.y),
  );
  return overlapX * overlapY;
};

/** 1 for completely overlapping, 0.1 for hardly overlapping, 0 for not at all as a proportion of the first item */
export const itemXyOverlapArea = (
  { state: { box: box1 } }: UnionOfAllItemInPlayTypes,
  { state: { box: box2 } }: UnionOfAllItemInPlayTypes,
): number => {
  return xyRectangleOverlapArea(box1, box2);
};
