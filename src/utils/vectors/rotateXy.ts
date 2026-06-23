import { type Xy, type Xyz } from "./vectors";

/**
 * the camera-angle vector for "no rotation" (the default view), taken as
 * (cos, sin) = (1, 0). The four camera angles are the four unit vectors
 * (1,0) (0,1) (-1,0) (0,-1); since 90° turns keep the components in {-1,0,1}
 * there is no floating-point drift.
 */
export const cameraAngleBase: Xy = { x: 1, y: 0 };

/** a quarter-turn clockwise, as a (cos,sin) multiplier to pass to rotateXy */
export const quarterTurnClockwise: Xy = { x: 0, y: -1 };
/** a quarter-turn anticlockwise, as a (cos,sin) multiplier to pass to rotateXy */
export const quarterTurnAnticlockwise: Xy = { x: 0, y: 1 };

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
