import { cameraAngleBase } from "../../../../utils/vectors/cameraAngleVectors";
import { type Xy, type XyzBox } from "../../../../utils/vectors/vectors";

/**
 * Test oracle (not used by production): rotate an axis-aligned world box about the
 * vertical (z) axis by `cameraAngle`, returning the equivalent axis-aligned box. A
 * 90° turn keeps the box axis-aligned but moves its min corner and (for odd
 * quarter-turns) swaps the x/y extents.
 *
 * The camera-angle draw-order tests use this to bake a rotation into world coords
 * as an **independent** reference, then check the production at-point-of-use
 * projection (which never builds such a box) produces the same draw order.
 */
export const worldBoxToCameraSpace = (
  box: Readonly<XyzBox>,
  cameraAngle: Xy = cameraAngleBase,
): XyzBox => {
  const { x: cos, y: sin } = cameraAngle;
  // the two opposite xy corners of the box, rotated about the vertical axis:
  const corner0X = box.x * cos - box.y * sin;
  const corner0Y = box.x * sin + box.y * cos;
  const corner1X = (box.x + box.xd) * cos - (box.y + box.yd) * sin;
  const corner1Y = (box.x + box.xd) * sin + (box.y + box.yd) * cos;
  return {
    x: Math.min(corner0X, corner1X),
    y: Math.min(corner0Y, corner1Y),
    z: box.z,
    xd: Math.abs(corner1X - corner0X),
    yd: Math.abs(corner1Y - corner0Y),
    zd: box.zd,
  };
};
