import { originXy, xyEqual, type Xyz } from "../../../utils/vectors/vectors";

/**
 * the direction to turn to on being touched; `undefined` if the strategy has no
 * turn to give
 */
export const turnedVector = (
  walkVector: Xyz,
  mtv: Xyz,
  strategy: TurnStrategy,
  /**
   * a value in `[0, 1)` deciding which side the perpendicular strategies turn
   * to - derived from stable pseudo-randomness (eg the item's `hash` salted
   * with the room time) so turns are deterministic. Unused by the other
   * strategies
   */
  turnRoll: number,
): undefined | Xyz => {
  // can't turn if not already moving
  if (xyEqual(walkVector, originXy)) {
    return undefined;
  }

  switch (strategy) {
    case "opposite":
      return {
        x: mtv.x === 0 ? walkVector.x : -walkVector.x,
        y: mtv.y === 0 ? walkVector.y : -walkVector.y,
        z: 0,
      };
    case "anticlockwise":
      return {
        x: walkVector.y,
        y: -walkVector.x,
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
      const intoSurface = mtv.x === 0 ? walkVector.y : walkVector.x;
      if (intoSurface === 0) {
        // touch is perpendicular to the direction of travel, does not block, do not turn
        return undefined;
      }

      const turnSign = turnRoll < 0.5 ? -1 : 1;
      return {
        x: mtv.x === 0 ? turnSign * walkVector.y : 0,
        y: mtv.y === 0 ? turnSign * walkVector.x : 0,
        z: 0,
      };
    }
  }
};
export type TurnStrategy =
  | "anticlockwise"
  | "clockwise"
  | "opposite"
  | "perpendicular-or-reverse"
  | "perpendicular";
