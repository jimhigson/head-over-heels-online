import type { Xyz } from "../../../utils/vectors/vectors";

export const Z_COMPARATOR_OF_VISUALLY_OVERLAPPING_UNDECIDED = 2 as const;

/** returns (strictly)
 * 1 if A in front
 * -1 if B in front
 * 2 if objects are overlapping
 */
export const zComparatorOfVisuallyOverlapping = (
  aPosition: Xyz,
  aBb: Xyz,
  bPosition: Xyz,
  bBb: Xyz,
): -1 | 1 | typeof Z_COMPARATOR_OF_VISUALLY_OVERLAPPING_UNDECIDED => {
  const aXMin = aPosition.x;
  const aXMax = aXMin + aBb.x;
  const bXMin = bPosition.x;

  // check x: lower x is in front
  if (aXMax <= bXMin) {
    // a is entirely less than b in [x] — a is in front
    return 1;
  }
  const bXMax = bXMin + bBb.x;
  if (aXMin >= bXMax) {
    // b is entirely less than a in [x] — b is in front
    return -1;
  }

  const aYMin = aPosition.y;
  const aYMax = aYMin + aBb.y;
  const bYMin = bPosition.y;
  // a and b overlap in x, check y: lower y is in front
  if (aYMax <= bYMin) {
    // a is entirely less than b in [y] — a is in front
    return 1;
  }
  const bYMax = bPosition.y + bBb.y;
  if (aYMin >= bYMax) {
    // b is entirely less than a in [y] — b is in front
    return -1;
  }

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
): number => {
  const aXMin = aPosition.x;
  const aXMax = aXMin + aBb.x;
  const bXMin = bPosition.x;
  const bXMax = bXMin + bBb.x;
  const aYMin = aPosition.y;
  const aYMax = aYMin + aBb.y;

  const bYMin = bPosition.y;
  const bYMax = bYMin + bBb.y;
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

export const zScore = (itemPosition: Xyz) =>
  itemPosition.x + itemPosition.y - itemPosition.z;
