import {
  cameraAngleBase,
  halfTurn,
  quarterTurnAnticlockwise,
  quarterTurnClockwise,
} from "./cameraAngleVectors";
import { type DirectionXy4, type Xy, type Xyz } from "./vectors";

/**
 * the rotation (camera-angle) vector at which world "away" renders in each
 * apparent (screen) direction, for going from a direction label back to the
 * rotation it names
 */
export const rotationVectorsByDirectionXy4 = {
  away: cameraAngleBase,
  right: quarterTurnAnticlockwise,
  towards: halfTurn,
  left: quarterTurnClockwise,
} as const satisfies Record<DirectionXy4, Xy>;

/**
 * rotate a 2d vector by the rotation the unit vector `by` represents, taken as
 * (cos, sin) - ie complex multiplication. For our 90° camera turns `by` is always
 * one of (±1,0) / (0,±1), so the result is exact.
 */
export const rotateXy = (v: Xy, by: Xy): Xy => ({
  x: v.x * by.x - v.y * by.y,
  y: v.x * by.y + v.y * by.x,
});

/** rotate the x,y of a 3d vector by `by`; z is the rotation axis so is unchanged */
export const rotateXyz = (v: Xyz, by: Xy): Xyz => {
  const { x, y } = rotateXy(v, by);
  return { x, y, z: v.z };
};

/**
 * the x-component of `(x,y)` rotated by `by` (cos,sin): `x·cos − y·sin`. Scalar
 * form of {@link rotateXy} for hot paths that must not allocate an `Xy`.
 */
export const rotatedX = (x: number, y: number, by: Xy): number =>
  x * by.x - y * by.y;

/**
 * the y-component of `(x,y)` rotated by `by` (cos,sin): `x·sin + y·cos`. Scalar
 * form of {@link rotateXy} for hot paths that must not allocate an `Xy`.
 */
export const rotatedY = (x: number, y: number, by: Xy): number =>
  x * by.y + y * by.x;
