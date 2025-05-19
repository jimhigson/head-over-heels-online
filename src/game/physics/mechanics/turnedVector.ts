import type { Xyz } from "../../../utils/vectors/vectors";
import { randomFromArray } from "./movement";

export const turnedVector = (
  walkVector: Xyz,
  mtv: Xyz,
  strategy: TurnStrategy,
): Xyz => {
  switch (strategy) {
    case "opposite":
      return {
        x: mtv.x === 0 ? walkVector.x : -walkVector.x,
        y: mtv.y === 0 ? walkVector.y : -walkVector.y,
        z: 0,
      };
    case "clockwise":
      return {
        x: -walkVector.y,
        y: walkVector.x,
        z: 0,
      };
    case "perpendicular-or-reverse":
    case "perpendicular": {
      const randomSign = randomFromArray([-1, 1]);
      return {
        x: mtv.x === 0 ? randomSign * walkVector.y : 0,
        y: mtv.y === 0 ? randomSign * walkVector.x : 0,
        z: 0,
      };
    }
  }
};
export type TurnStrategy =
  | "opposite"
  | "perpendicular"
  | "clockwise"
  | "perpendicular-or-reverse";
