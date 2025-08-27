import type { UnionOfAllItemInPlayTypes } from "./ItemInPlay";

import { addXyz, scaleXyz } from "../utils/vectors/vectors";

export const itemInPlayCentre = (item: UnionOfAllItemInPlayTypes) => {
  return addXyz(item.state.position, scaleXyz(item.aabb, 0.5));
};
