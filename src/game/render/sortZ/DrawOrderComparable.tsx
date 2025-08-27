import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";

export type DrawOrderComparable = Pick<
  UnionOfAllItemInPlayTypes,
  "aabb" | "fixedZIndex" | "id" | "renderAabb" | "renderAabbOffset"
> & {
  state: { position: { x: number; y: number; z: number } };
};
