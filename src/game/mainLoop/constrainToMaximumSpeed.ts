import type { UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";

import { epsilon } from "../../utils/epsilon";
import {
  lengthXy,
  scaleXyInPlace,
  type Xyz,
} from "../../utils/vectors/vectors";
import { maybeSpeedForItem } from "../physics/mechanics/speedForItem";
import { maximumSpeedCoefficient } from "../physics/mechanicsConstants";

export const constrainToMaximumSpeedInPlace = (
  item: UnionOfAllItemInPlayTypes<string, string>,
  posDelta: Xyz,
  deltaMS: number,
) => {
  const normalSpeed = maybeSpeedForItem(item);
  if (normalSpeed !== undefined) {
    const maxSpeed = normalSpeed * maximumSpeedCoefficient;
    const itemSpeedXy =
      lengthXy(posDelta) /
      // protect against zero deltaMS (maybe if game is paused, although then
      // nothing will be moving very fast anyway 🤷‍♂️)
      Math.max(deltaMS, epsilon);
    if (itemSpeedXy > maxSpeed) {
      // item is going too fast in xy. Change the xy, leave z as-is:
      scaleXyInPlace(posDelta, maxSpeed / itemSpeedXy);
    }
  }
};
