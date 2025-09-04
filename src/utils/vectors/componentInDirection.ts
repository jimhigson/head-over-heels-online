import { dotProductXyz, scaleXyz, type Xyz } from "./vectors";

/**
 * returns the component of vector @param v in the direction described by unit
 * vector @param unitD */

export const componentInDirection = (v: Xyz, unitD: Xyz): Xyz => {
  // Calculate the scalar projection of v onto d
  const scalarProjection = dotProductXyz(v, unitD);

  // Scale the unit vector d by the scalar projection to get the vector component
  return scaleXyz(unitD, scalarProjection);
};

/**
 * Modifies the first vector to become its component in the direction of the unit vector.
 * This replaces v with its projection onto unitD.
 */
export const componentInDirectionInPlace = (
  /** The vector to project and modify in place */
  v: Xyz,
  /** The unit vector defining the direction to project onto */
  unitD: Xyz,
): Xyz => {
  // Calculate the scalar projection of v onto unitD
  const scalarProjection = dotProductXyz(v, unitD);

  // Replace v with unitD scaled by the projection
  v.x = unitD.x * scalarProjection;
  v.y = unitD.y * scalarProjection;
  v.z = unitD.z * scalarProjection;

  return v;
};
