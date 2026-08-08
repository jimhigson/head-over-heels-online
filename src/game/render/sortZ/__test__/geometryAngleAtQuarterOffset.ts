import { rotateXy } from "../../../../utils/vectors/rotateXy";
import { type Xy } from "../../../../utils/vectors/vectors";

/**
 * geometry-angle offsets (degrees anticlockwise) around a settled quarter, used
 * to exercise the draw-order comparator MID-TRANSITION: 0 is the settled
 * quarter, ±20 sit either side of it, comfortably inside the quarter turn (the
 * view-direction world-x/world-y functionals only change sign at the eighths,
 * 45° from each quarter, so a genuinely axis-separated pair keeps its order
 * across this whole ±20 window - any flip within it is a comparator bug).
 */
export const midTransitionGeometryOffsetsDegrees = [0, 20, -20];

/**
 * the continuous geometry angle `offsetDegrees` anticlockwise of a settled
 * `quarterAngle` (the quarter itself when the offset is 0). Pair this with a
 * quarter-quantised participation/render-box set to reproduce what the room
 * renderer projects while a rotation transition is in flight.
 */
export const geometryAngleAtQuarterOffset = (
  quarterAngle: Xy,
  offsetDegrees: number,
): Xy => {
  if (offsetDegrees === 0) {
    return quarterAngle;
  }
  const radians = (offsetDegrees * Math.PI) / 180;
  return rotateXy(quarterAngle, { x: Math.cos(radians), y: Math.sin(radians) });
};
