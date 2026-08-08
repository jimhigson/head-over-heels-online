import { type Xy, type Xyz } from "./vectors";

/**
 * the camera-angle vector for "no rotation" (the default view), taken as
 * (cos, sin) = (1, 0). The four camera angles are the four unit vectors
 * (1,0) (0,1) (-1,0) (0,-1); since 90° turns keep the components in {-1,0,1}
 * there is no floating-point drift.
 */

export const cameraAngleBase: Xy = Object.freeze({ x: 1, y: 0 });
/** a quarter-turn clockwise, as a (cos,sin) multiplier to pass to rotateXy */
export const quarterTurnClockwise: Xy = Object.freeze({ x: 0, y: -1 });
/** a quarter-turn anticlockwise, as a (cos,sin) multiplier to pass to rotateXy */
export const quarterTurnAnticlockwise: Xy = Object.freeze({ x: 0, y: 1 });
/** 180º rotation from the original angle */
export const halfTurn: Xy = Object.freeze({ x: -1, y: 0 });
/** the four 90° camera angles, as (cos,sin) unit vectors */

export const quarterCameraAngles: ReadonlyArray<Xy> = Object.freeze([
  cameraAngleBase,
  quarterTurnAnticlockwise,
  halfTurn,
  quarterTurnClockwise,
]);

/**
 * the quarter-turn camera angle nearest to a continuous render angle. Always
 * returns one of the (identity-stable, frozen) angles so `===` is safe. If
 * exactly halfway between, the choice is not specified.
 */
export const nearestQuarterAngle = (angle: Xy): Xy => {
  return (
    Math.abs(angle.x) > Math.abs(angle.y) ?
      angle.x > 0 ?
        cameraAngleBase
      : halfTurn
    : angle.y > 0 ? quarterTurnAnticlockwise
    : quarterTurnClockwise
  );
};

/**
 * angles within this distance of a quarter-angle will return true for the
 * sake of isAtQuarterAngle
 */
const atQuarterAngleEpsilon = 1e-6;

export const isAtQuarterAngle = (angle: Xy): boolean => {
  const quarter = nearestQuarterAngle(angle);
  return (
    Math.abs(angle.x - quarter.x) < atQuarterAngleEpsilon &&
    Math.abs(angle.y - quarter.y) < atQuarterAngleEpsilon
  );
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
 * of rotating by the camera angle.
 */
export const rotateXyzByInverseCameraAngle = (v: Xyz, cameraAngle: Xy): Xyz => {
  // the complex multiply by the conjugate (x, -y), inlined so the conjugate
  // is never allocated:
  const x = v.x * cameraAngle.x + v.y * cameraAngle.y;
  const y = -v.x * cameraAngle.y + v.y * cameraAngle.x;
  return {
    // `-0` (from multiplying by the angle's zero component) is normalised to `0`
    // so results compare cleanly with ===
    x: x === 0 ? 0 : x,
    y: y === 0 ? 0 : y,
    z: v.z,
  };
};
