import { epsilon } from "../../utils/epsilon";
import type { AxisXyz, XyzBox } from "../../utils/vectors/vectors";

/**
 * @returns the axis on which two boxes only just touch (overlapping on the other 2),
 * within epsilon tolerance, or undefined if they don't.
 *
 * Boxes that only line up along an edge or corner don't count as touch, needs to be
 * face-to-face
 */
export const boxFacesJustTouchingAxis = (
  a: Readonly<XyzBox>,
  b: Readonly<XyzBox>,
): AxisXyz | undefined => {
  // unrolled, since this is checked against every item near a moving one.
  // Negative for a gap between the boxes on that axis:
  const overlapX = Math.min(a.x + a.xd, b.x + b.xd) - Math.max(a.x, b.x);
  const overlapY = Math.min(a.y + a.yd, b.y + b.yd) - Math.max(a.y, b.y);
  const overlapZ = Math.min(a.z + a.zd, b.z + b.zd) - Math.max(a.z, b.z);
  const touchingX = Math.abs(overlapX) < epsilon;
  const touchingY = Math.abs(overlapY) < epsilon;
  const touchingZ = Math.abs(overlapZ) < epsilon;

  if (
    // apart on any axis:
    (!touchingX && overlapX < 0) ||
    (!touchingY && overlapY < 0) ||
    (!touchingZ && overlapZ < 0)
  ) {
    return undefined;
  }
  // touching on more than one axis is an edge or corner:
  if (touchingX) {
    return touchingY || touchingZ ? undefined : "x";
  }
  if (touchingY) {
    return touchingZ ? undefined : "y";
  }
  return touchingZ ? "z" : undefined;
};
