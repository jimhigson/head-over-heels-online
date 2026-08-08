import { cameraAngleBase } from "../../../../utils/vectors/cameraAngleVectors";
import { type Xy, type Xyz } from "../../../../utils/vectors/vectors";

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
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy = cameraAngleBase,
): { position: Xyz; aabb: Xyz } => {
  const { x: cos, y: sin } = cameraAngle;
  // the two opposite xy corners of the box, rotated about the vertical axis:
  const corner0X = position.x * cos - position.y * sin;
  const corner0Y = position.x * sin + position.y * cos;
  const corner1X = (position.x + aabb.x) * cos - (position.y + aabb.y) * sin;
  const corner1Y = (position.x + aabb.x) * sin + (position.y + aabb.y) * cos;
  return {
    position: {
      x: Math.min(corner0X, corner1X),
      y: Math.min(corner0Y, corner1Y),
      z: position.z,
    },
    aabb: {
      x: Math.abs(corner1X - corner0X),
      y: Math.abs(corner1Y - corner0Y),
      z: aabb.z,
    },
  };
};
