import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";

export type DrawOrderComparable = Pick<
  UnionOfAllItemInPlayTypes,
  "id" | "aabb" | "renderAabb" | "renderAabbOffset" | "fixedZIndex"
> & {
  state: { position: { x: number; y: number; z: number } };
};
