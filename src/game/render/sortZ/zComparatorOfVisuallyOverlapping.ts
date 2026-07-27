import {
  rotatedXMaxOverRect,
  rotatedXMinOverRect,
  rotatedYMaxOverRect,
  rotatedYMinOverRect,
} from "../../../utils/vectors/rotateXy";
import { type Xy, type Xyz } from "../../../utils/vectors/vectors";

export const Z_COMPARATOR_OF_VISUALLY_OVERLAPPING_UNDECIDED = 2 as const;

/**
 * order for one horizontal (world x or y) axis: which of the two boxes the
 * viewer sees in front, given they are separated on that axis, or 0 when they
 * are not separated on it. `viewDirection` is the view ray's component along
 * the axis, whose sign says which side is nearer.
 *
 * Both "separated with a lower" and "separated with b lower" can only hold at
 * once for coincident zero-extent boxes (two items in the same plane) - there
 * is then no separation direction and no view-correct order, so a stable,
 * view-independent order is returned (a in front - the same resolution the
 * fixed-camera rules gave at every quarter angle)
 */
const horizontalSeparationOrder = (
  aMax: number,
  bMin: number,
  bMax: number,
  aMin: number,
  viewDirection: number,
): -1 | 0 | 1 => {
  const aLower = aMax <= bMin;
  const bLower = bMax <= aMin;
  if (aLower && bLower) {
    return 1;
  }
  if (aLower) {
    return viewDirection > 0 ? 1 : -1;
  }
  if (bLower) {
    return viewDirection > 0 ? -1 : 1;
  }
  return 0;
};

/** returns (strictly)
 * 1 if A in front
 * -1 if B in front
 * 2 if objects are overlapping
 *
 * World-axis separation: two world-aligned boxes are disjoint iff separated
 * (touching included) on world x, y or z, and the separating axis decides
 * front/back exactly, at any camera angle - the box on the side the view ray
 * comes from is in front. The view ray is camera-space `(1, 1, −1)` at every
 * angle, which in world space is `(cos+sin, cos−sin, −1)`; the sign of its
 * component along the separating axis picks the front side. UNDECIDED is
 * returned only when the boxes genuinely intersect in world space (overlap
 * strictly on all three axes).
 *
 * The world axis currently rendering nearest to camera-x is tested first, so
 * at the four quarter angles (where camera axes ARE world axes) the decision
 * precedence is identical to the fixed-camera rules (lower camera-x / lower
 * camera-y in front, higher z in front). An axis exactly perpendicular to the
 * view (component 0, only at the exact turn diagonals) gives no occlusion
 * order and is skipped.
 */
export const zComparatorOfVisuallyOverlapping = (
  aPosition: Xyz,
  aBb: Xyz,
  bPosition: Xyz,
  bBb: Xyz,
  cameraAngle: Xy,
): -1 | 1 | typeof Z_COMPARATOR_OF_VISUALLY_OVERLAPPING_UNDECIDED => {
  const { x: c, y: s } = cameraAngle;
  const dX = c + s;
  const dY = c - s;

  const ax1 = aPosition.x + aBb.x;
  const bx1 = bPosition.x + bBb.x;
  const ay1 = aPosition.y + aBb.y;
  const by1 = bPosition.y + bBb.y;

  const xDominant = Math.abs(c) >= Math.abs(s);

  // the horizontal axes in precedence order: the axis the view direction
  // leans on more is tested first, since when the boxes are separated on
  // both it is the dominant one that decides what the viewer sees in front.
  // Plain sequenced calls (no closures): this runs per candidate pair per
  // frame
  let horizontalOrder: -1 | 0 | 1 = 0;
  if (xDominant && dX !== 0) {
    horizontalOrder = horizontalSeparationOrder(
      ax1,
      bPosition.x,
      bx1,
      aPosition.x,
      dX,
    );
  }
  if (horizontalOrder === 0 && dY !== 0) {
    horizontalOrder = horizontalSeparationOrder(
      ay1,
      bPosition.y,
      by1,
      aPosition.y,
      dY,
    );
  }
  if (horizontalOrder === 0 && !xDominant && dX !== 0) {
    horizontalOrder = horizontalSeparationOrder(
      ax1,
      bPosition.x,
      bx1,
      aPosition.x,
      dX,
    );
  }
  if (horizontalOrder !== 0) {
    return horizontalOrder;
  }

  // z is the rotation axis: the view ray's z component is −1 at every angle,
  // so higher z is always in front
  const aZMax = aPosition.z + aBb.z;
  const bZMax = bPosition.z + bBb.z;
  const aSideZ = aZMax <= bPosition.z;
  const bSideZ = bZMax <= aPosition.z;
  if (aSideZ && bSideZ) {
    return -1;
  }
  if (aSideZ) {
    // a is entirely below b in [z] — a is behind
    return -1;
  }
  if (bSideZ) {
    // b is entirely below a in [z] — b is behind
    return 1;
  }

  return Z_COMPARATOR_OF_VISUALLY_OVERLAPPING_UNDECIDED;
};

export const zComparatorOfVisuallyOverlappingByMtv = (
  aPosition: Xyz,
  aBb: Xyz,
  bPosition: Xyz,
  bBb: Xyz,
  cameraAngle: Xy,
): number => {
  const ax0 = aPosition.x;
  const ax1 = aPosition.x + aBb.x;
  const ay0 = aPosition.y;
  const ay1 = aPosition.y + aBb.y;
  const bx0 = bPosition.x;
  const bx1 = bPosition.x + bBb.x;
  const by0 = bPosition.y;
  const by1 = bPosition.y + bBb.y;

  // camera-space x/y intervals (z is the rotation axis, so unchanged), by
  // interval arithmetic over the footprint - exact at any camera angle:
  const aXMin = rotatedXMinOverRect(ax0, ax1, ay0, ay1, cameraAngle);
  const aXMax = rotatedXMaxOverRect(ax0, ax1, ay0, ay1, cameraAngle);
  const bXMin = rotatedXMinOverRect(bx0, bx1, by0, by1, cameraAngle);
  const bXMax = rotatedXMaxOverRect(bx0, bx1, by0, by1, cameraAngle);

  const aYMin = rotatedYMinOverRect(ax0, ax1, ay0, ay1, cameraAngle);
  const aYMax = rotatedYMaxOverRect(ax0, ax1, ay0, ay1, cameraAngle);
  const bYMin = rotatedYMinOverRect(bx0, bx1, by0, by1, cameraAngle);
  const bYMax = rotatedYMaxOverRect(bx0, bx1, by0, by1, cameraAngle);

  const aZMin = aPosition.z;
  const aZMax = aZMin + aBb.z;
  const bZMin = bPosition.z;
  const bZMax = bZMin + bBb.z;

  // if we get here, two items are intersecting - this is not typical, but can happen
  // for non-solid items - eg:
  //
  //  * the cloud left over after a pickup is collected is visual but non-solid so can be walked/jumped through
  //  * items that render outside of their physical bounding boxes (the original game sprites have
  //    quite a lot of this)
  //
  // at this point, their 3d visual representations overlap in 3-space, so neither is entirely in front or behind
  // the other - in a true 3d engine with a z-buffer they would clip. The best approximation of which is
  // "in front" comes from calculating their mtv:

  const dx1 = aXMax - bXMin; // Right overlap
  const dy1 = aYMax - bYMin; // Far overlap
  const dz1 = aZMax - bZMin; // overlap Bottom of a with Top of b

  const dx2 = bXMax - aXMin; // overlap Left of a with Right of b
  const dy2 = bYMax - aYMin; // overlap Away of a with Towards of b
  const dz2 = bZMax - aZMin; // overlap Top of a with Bottom of b

  const mtvX = Math.abs(dx1) < Math.abs(dx2) ? dx1 : -dx2;
  const mtvY = Math.abs(dy1) < Math.abs(dy2) ? dy1 : -dy2;
  // negated because z runs opposite to x and y: higher z is in front,
  // so the MTV sign needs flipping to match the draw-order convention
  // (positive = a in front, negative = b in front)
  const mtvZ = -(Math.abs(dz1) < Math.abs(dz2) ? dz1 : -dz2);

  const absMtvX = Math.abs(mtvX);
  const absMtvY = Math.abs(mtvY);
  const absMtvZ = Math.abs(mtvZ);

  // the MTV axis is the one with the smallest absolute penetration
  return (
    absMtvX < absMtvY ?
      absMtvX < absMtvZ ?
        mtvX
      : mtvZ
    : absMtvY < absMtvZ ? mtvY
    : mtvZ
  );
};
