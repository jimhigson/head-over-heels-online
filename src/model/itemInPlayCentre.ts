import { addXyzInPlace, scaleXyz } from "../utils/vectors/vectors";
import { type UnionOfAllItemInPlayTypes } from "./ItemInPlay";

export const itemInPlayCentre = (item: UnionOfAllItemInPlayTypes) => {
  return addXyzInPlace(scaleXyz(item.aabb, 0.5), item.state.position);
};
