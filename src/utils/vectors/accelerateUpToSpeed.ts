import { lengthXyz, scaleXyz, type Xyz } from "./vectors";

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
  const existingSpeed = lengthXyz(vel);

  const targetSpeedInDirection = Math.max(
    minSpeed,
    Math.min(maxSpeed, existingSpeed + acc * deltaMS),
  );

  // would applying the full accel put us over the max speed?
  const newSpeed = Math.min(targetSpeedInDirection, maxSpeed);

  return scaleXyz(unitD, newSpeed);
};
