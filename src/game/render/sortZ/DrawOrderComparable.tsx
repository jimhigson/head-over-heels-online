import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";

export type DrawOrderComparable = Pick<
  UnionOfAllItemInPlayTypes,
  "id" | "aabb" | "renderAabb" | "fixedZIndex"
> & {
  state: { position: { x: number; y: number; z: number } };
};
