import type { UnionOfAllItemInPlayTypes } from "./ItemInPlay";

import { addXyzInPlace, scaleXyz } from "../utils/vectors/vectors";

export const itemInPlayCentre = (item: UnionOfAllItemInPlayTypes) => {
  return addXyzInPlace(scaleXyz(item.aabb, 0.5), item.state.position);
};
