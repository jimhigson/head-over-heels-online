import { roundToNearest } from "../utils/maths/maths";
import { type Xyz } from "../utils/vectors/vectors";
import { type GridResolution } from "./slice/levelEditorSlice";

/**
 * a position moved across (in x and y, not z) to the nearest point on the grid
 */
export const snappedToGridXy = (
  position: Xyz,
  gridResolution: GridResolution,
): Xyz => ({
  x: roundToNearest(position.x, gridResolution),
  y: roundToNearest(position.y, gridResolution),
  z: position.z,
});
