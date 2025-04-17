import { addXyz, scaleXyz } from "../utils/vectors/vectors";
import type { UnionOfAllItemInPlayTypes } from "./ItemInPlay";

export const itemInPlayCentre = (item: UnionOfAllItemInPlayTypes) => {
  return addXyz(item.state.position, scaleXyz(item.aabb, 0.5));
};
