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
