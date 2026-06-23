import { rotatedX, rotatedY } from "../../../utils/vectors/rotateXy";
import { type Xy, type Xyz } from "../../../utils/vectors/vectors";

export const Z_COMPARATOR_OF_VISUALLY_OVERLAPPING_UNDECIDED = 2 as const;

/** returns (strictly)
 * 1 if A in front
 * -1 if B in front
 * 2 if objects are overlapping
 *
 * The camera rotation is folded into the comparison here: the boxes are compared in
 * camera space (world x,y rotated by `cameraAngle`; z is the rotation axis, so
 * unchanged), computed inline rather than from a pre-rotated box. In camera space the
 * fixed-camera ordering rules apply (lower x / lower y in front, higher z in front).
 * For a 90° turn `rotatedX`/`rotatedY` is a signed axis pick, so the two opposite xy
 * corners span the extreme.
 */
export const zComparatorOfVisuallyOverlapping = (
  aPosition: Xyz,
  aBb: Xyz,
  bPosition: Xyz,
  bBb: Xyz,
  cameraAngle: Xy,
): -1 | 1 | typeof Z_COMPARATOR_OF_VISUALLY_OVERLAPPING_UNDECIDED => {
  // camera-space x interval of each box:
  const aRotX0 = rotatedX(aPosition.x, aPosition.y, cameraAngle);
  const aRotX1 = rotatedX(
    aPosition.x + aBb.x,
    aPosition.y + aBb.y,
    cameraAngle,
  );
  const aXMin = Math.min(aRotX0, aRotX1);
  const aXMax = Math.max(aRotX0, aRotX1);
  const bRotX0 = rotatedX(bPosition.x, bPosition.y, cameraAngle);
  const bRotX1 = rotatedX(
    bPosition.x + bBb.x,
    bPosition.y + bBb.y,
    cameraAngle,
  );
  const bXMin = Math.min(bRotX0, bRotX1);

  // check x: lower x is in front
  if (aXMax <= bXMin) {
    // a is entirely less than b in [x] — a is in front
    return 1;
  }
  const bXMax = Math.max(bRotX0, bRotX1);
  if (aXMin >= bXMax) {
    // b is entirely less than a in [x] — b is in front
    return -1;
  }

  // camera-space y interval of each box:
  const aRotY0 = rotatedY(aPosition.x, aPosition.y, cameraAngle);
  const aRotY1 = rotatedY(
    aPosition.x + aBb.x,
    aPosition.y + aBb.y,
    cameraAngle,
  );
  const aYMin = Math.min(aRotY0, aRotY1);
  const aYMax = Math.max(aRotY0, aRotY1);
  const bRotY0 = rotatedY(bPosition.x, bPosition.y, cameraAngle);
  const bRotY1 = rotatedY(
    bPosition.x + bBb.x,
    bPosition.y + bBb.y,
    cameraAngle,
  );
  const bYMin = Math.min(bRotY0, bRotY1);

  // a and b overlap in x, check y: lower y is in front
  if (aYMax <= bYMin) {
    // a is entirely less than b in [y] — a is in front
    return 1;
  }
  const bYMax = Math.max(bRotY0, bRotY1);
  if (aYMin >= bYMax) {
    // b is entirely less than a in [y] — b is in front
    return -1;
  }

  // z is the rotation axis, so unchanged:
  const aZMin = aPosition.z;
  const aZMax = aZMin + aBb.z;
  const bZMin = bPosition.z;
  // a and b overlap in x and y, check z: *higher* z is in front/above (sign flipped vs x and y)
  if (aZMax <= bZMin) {
    // a is entirely below b in [z] — a is behind
    return -1;
  }
  const bZMax = bPosition.z + bBb.z;
  if (aZMin >= bZMax) {
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
  // camera-space x/y intervals (z is the rotation axis, so unchanged):
  const aRotX0 = rotatedX(aPosition.x, aPosition.y, cameraAngle);
  const aRotX1 = rotatedX(
    aPosition.x + aBb.x,
    aPosition.y + aBb.y,
    cameraAngle,
  );
  const aXMin = Math.min(aRotX0, aRotX1);
  const aXMax = Math.max(aRotX0, aRotX1);
  const bRotX0 = rotatedX(bPosition.x, bPosition.y, cameraAngle);
  const bRotX1 = rotatedX(
    bPosition.x + bBb.x,
    bPosition.y + bBb.y,
    cameraAngle,
  );
  const bXMin = Math.min(bRotX0, bRotX1);
  const bXMax = Math.max(bRotX0, bRotX1);

  const aRotY0 = rotatedY(aPosition.x, aPosition.y, cameraAngle);
  const aRotY1 = rotatedY(
    aPosition.x + aBb.x,
    aPosition.y + aBb.y,
    cameraAngle,
  );
  const aYMin = Math.min(aRotY0, aRotY1);
  const aYMax = Math.max(aRotY0, aRotY1);
  const bRotY0 = rotatedY(bPosition.x, bPosition.y, cameraAngle);
  const bRotY1 = rotatedY(
    bPosition.x + bBb.x,
    bPosition.y + bBb.y,
    cameraAngle,
  );
  const bYMin = Math.min(bRotY0, bRotY1);
  const bYMax = Math.max(bRotY0, bRotY1);

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
