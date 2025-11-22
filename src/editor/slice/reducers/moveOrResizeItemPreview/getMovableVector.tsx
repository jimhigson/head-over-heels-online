import type { JsonItemUnion } from "../../../../model/json/JsonItem";

import {
  doorAlongAxis,
  unitXyz,
  type Xyz,
} from "../../../../utils/vectors/vectors";

/** get the the axes on which an item can be moved */
export const getMovableVector = (jsonItem: JsonItemUnion): Xyz => {
  switch (jsonItem.type) {
    case "door": {
      const axis = doorAlongAxis(jsonItem.config.direction);
      return axis === "x" ? { x: 1, y: 0, z: 1 } : { x: 0, y: 1, z: 1 };
    }
    default:
      return unitXyz;
  }
};
