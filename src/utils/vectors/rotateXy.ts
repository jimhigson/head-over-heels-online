import {
  type AxisXy,
  type DirectionXy4,
  rotateAxisXyByCameraAngle,
  type Xy,
  type Xyz,
} from "./vectors";

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
/** 180º rotation from the original angle */
export const halfTurn: Xy = { x: -1, y: 0 };

/** the four 90° camera angles, as (cos,sin) unit vectors */
export const allCameraAngles: ReadonlyArray<Xy> = [
  cameraAngleBase,
  quarterTurnAnticlockwise,
  halfTurn,
  quarterTurnClockwise,
];

/**
 * the rotation (camera-angle) vector at which world "away" renders in each
 * apparent (screen) direction - the inverse of
 * `rotateDirectionXy4ByCameraAngle("away", angle)`, for going from a
 * direction label back to the rotation it names
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
 * the camera angle that undoes rotation by `cameraAngle` - its complex
 * conjugate. `-0` in the y component is normalised to `0` so inverted angles
 * compare cleanly
 */
export const invertCameraAngle = ({ x, y }: Xy): Xy => ({
  x,
  y: y === 0 ? 0 : -y,
});

/**
 * rotate an apparent (camera-space) vector back into world space - the inverse
 * of rotating by the camera angle. Component `-0`s (from multiplying by the
 * angle's zero component) are normalised to `0` so results compare cleanly as
 * object literals
 */
export const rotateXyzByInverseCameraAngle = (v: Xyz, cameraAngle: Xy): Xyz => {
  const { x, y } = rotateXy(v, invertCameraAngle(cameraAngle));
  return { x: x === 0 ? 0 : x, y: y === 0 ? 0 : y, z: v.z };
};

/**
 * whether a world x/y axis, once rotated by the camera angle, projects in the
 * opposite screen direction to the base-angle projection of the axis it now
 * renders as. Sprite art extends/tiles from its anchor in the rendered axis's
 * base screen direction, so when the world axis projects reversed the art
 * hangs on the wrong side of its anchor and needs shifting back over its
 * footprint.
 */
export const axisProjectsReversed = (axis: AxisXy, cameraAngle: Xy): boolean =>
  rotateXy(axis === "x" ? { x: 1, y: 0 } : { x: 0, y: 1 }, cameraAngle)[
    rotateAxisXyByCameraAngle(axis, cameraAngle)
  ] < 0;

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
