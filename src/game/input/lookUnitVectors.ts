import type { Xyz } from "../../utils/vectors/vectors";
import type { LookDirectionsXy4 } from "./actions";

import { unitVectors } from "../../utils/vectors/unitVectors";

/**
 * maps look directions to the xy part of the xyz vector
 */
export const lookUnitVectors: Record<LookDirectionsXy4, Xyz> = {
  lookLeft: unitVectors.left,
  lookRight: unitVectors.right,
  lookUp: unitVectors.away,
  lookDown: unitVectors.towards,
};
