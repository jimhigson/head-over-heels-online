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

/*
 * extents of the rotated components over an axis-aligned rect
 * `[x0,x1]×[y0,y1]` by interval arithmetic: a rotated component is a linear
 * functional of (x,y), so each coefficient contributes its own extreme corner
 * independently. Exact at any angle (at the 90° camera angles this coincides
 * with evaluating the two opposite corners, since rotation is then a signed
 * axis pick). Hot-path scalar forms: no allocation.
 */

/** minimum of {@link rotatedX} (`c·x − s·y`) over the rect */
export const rotatedXMinOverRect = (
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  { x: c, y: s }: Xy,
): number => (c > 0 ? c * x0 : c * x1) + (s > 0 ? -s * y1 : -s * y0);

/** maximum of {@link rotatedX} (`c·x − s·y`) over the rect */
export const rotatedXMaxOverRect = (
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  { x: c, y: s }: Xy,
): number => (c > 0 ? c * x1 : c * x0) + (s > 0 ? -s * y0 : -s * y1);

/** minimum of {@link rotatedY} (`x·s + y·c`) over the rect */
export const rotatedYMinOverRect = (
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  { x: c, y: s }: Xy,
): number => (s > 0 ? s * x0 : s * x1) + (c > 0 ? c * y0 : c * y1);

/** maximum of {@link rotatedY} (`x·s + y·c`) over the rect */
export const rotatedYMaxOverRect = (
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  { x: c, y: s }: Xy,
): number => (s > 0 ? s * x1 : s * x0) + (c > 0 ? c * y1 : c * y0);
