import {
  type Xyz,
  scaleXyz,
  dotProductXyz,
  addXyz,
  subXyz,
} from "@/utils/vectors/vectors";
import { componentInDirection } from "./componentInDirection";

/* accelerates the current velocity towards the given max speed,
   reaching it if close enough rather than allowing to go over */
export const accelerateToSpeed = ({
  vel,
  acc,
  unitD,
  maxSpeed,
  deltaMS,
}: {
  /* The current velocity to accelerate from */
  vel: Xyz;
  /**
   * m/s²
   */
  acc: number /** the direction to accelerate in  */;
  unitD: Xyz;
  maxSpeed: number;
  deltaMS: number;
}): Xyz => {
  const directionPressedFullAccelVector = scaleXyz(unitD, acc);

  const targetSpeedInDirectionPressed = dotProductXyz(
    addXyz(vel, scaleXyz(directionPressedFullAccelVector, deltaMS)),
    unitD,
  );

  // would applying the full accel put us over the max speed?
  const approachingMaxSpeed = targetSpeedInDirectionPressed > maxSpeed;

  return approachingMaxSpeed ?
      // return acceleration vector just enough to get up to max speed over the duration of deltaMS
      instantAccelToSpeed({ vel, unitD, speed: maxSpeed, deltaMS })
    : directionPressedFullAccelVector;
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
