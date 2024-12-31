import {
  type Xyz,
  scaleXyz,
  dotProductXyz,
  addXyz,
  subXyz,
  perpendicularXyz,
  xyzLength,
} from "@/utils/vectors/vectors";
import { componentInDirection } from "./componentInDirection";

/** accelerates the current velocity towards the given max speed,
 * reaching it if close enough rather than allowing to go over
 * @return the new velocity, after acceleration has been applied
 */
export const accelerateToSpeed = ({
  vel,
  acc,
  unitD,
  maxSpeed,
  deltaMS,
  // how much to fade the cross-component of the acellerated direction.
  // eg, if you're accelerating north, how much to slow down going east?
  crossComponentFade = 0,
  minVelocity = 0,
}: {
  /* The current velocity to accelerate from */
  vel: Xyz;
  /**
   * acceleration to apply, in m/s²
   */
  acc: number;

  crossComponentFade?: number;

  minVelocity?: number;

  /** unit vector of the direction we want to accelerate in */
  unitD: Xyz;
  maxSpeed: number;
  deltaMS: number;
}): Xyz => {
  const existingSpeedInDirection = dotProductXyz(vel, unitD);

  const targetSpeedInDirection = Math.max(
    existingSpeedInDirection + acc * deltaMS,
    minVelocity,
  );

  // would applying the full accel put us over the max speed?
  const hitsMaxSpeedInDirection = targetSpeedInDirection >= maxSpeed;

  const crossUnitD = perpendicularXyz(unitD);
  const exitingSpeedInCrossDirection = dotProductXyz(vel, crossUnitD);
  const newSpeedInCrossDirection =
    exitingSpeedInCrossDirection >= 0 ?
      Math.max(exitingSpeedInCrossDirection - crossComponentFade * deltaMS, 0)
    : Math.min(exitingSpeedInCrossDirection + crossComponentFade * deltaMS, 0);

  return addXyz(
    scaleXyz(
      unitD,
      hitsMaxSpeedInDirection ? maxSpeed : targetSpeedInDirection,
    ),
    scaleXyz(crossUnitD, newSpeedInCrossDirection),
  );
};

/**
 * A simpler acceleration that preserves all of the built-up speed, even if it is in a different
 * direction (with no dot=product with the target direction)
 */
export const accelerateToSpeed2 = ({
  vel,
  acc,
  unitD,
  maxSpeed,
  deltaMS,
  minSpeed = 0,
}: {
  /* The current velocity to accelerate from */
  vel: Xyz;
  /**
   * acceleration to apply, in m/s²
   */
  acc: number;

  minSpeed?: number;

  /** unit vector of the direction we want to accelerate in */
  unitD: Xyz;
  maxSpeed: number;
  deltaMS: number;
}): Xyz => {
  const existingSpeed = xyzLength(vel);

  const targetSpeedInDirection = Math.max(
    minSpeed,
    Math.min(maxSpeed, existingSpeed + acc * deltaMS),
  );

  // would applying the full accel put us over the max speed?
  const newSpeed = Math.min(targetSpeedInDirection, maxSpeed);

  return scaleXyz(unitD, newSpeed);
};

/* calculated the accel vector to exactly hit a speed right away, in this frame */
export const instantAccelToSpeed = ({
  vel,
  unitD,
  speed,
  deltaMS,
}: {
  /* The current velocity to accelerate from */ vel: Xyz;
  unitD: Xyz /* speed to hit, in px/ms */;
  speed: number /* how long to accel over */;
  deltaMS: number;
}) => {
  return scaleXyz(
    subXyz(scaleXyz(unitD, speed), componentInDirection(vel, unitD)),
    1 / deltaMS,
  );
};
