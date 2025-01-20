import { componentInDirection } from "./componentInDirection";
import type { Xyz } from "./vectors";
import {
  xyzEqual,
  originXyz,
  unitVector,
  scaleXyz,
  dotProductXyz,
  addXyz,
} from "./vectors";

/*
 * eg, for when a direction is no longer pressed and player is idle - basically, friction etc
 */
export const fadeSpeedInDirection = ({
  vel,
  travelDirection,
  deceleration,
  deltaMS,
}: {
  vel: Xyz /**
   * The direction currently going in, to slow down from (or the component of travel).
   * The magnitude is not important since this function makes a unit vector from this vector
   */;
  travelDirection: Xyz;
  deceleration: number;
  deltaMS: number;
}): Xyz => {
  if (xyzEqual(travelDirection, originXyz)) {
    return originXyz;
  }

  const travelDirectionUnit = unitVector(travelDirection);
  const decelerationVector = scaleXyz(travelDirectionUnit, deceleration);

  const velocityComponentInDirection = componentInDirection(
    vel,
    travelDirectionUnit,
  );

  return (
      dotProductXyz(
        travelDirectionUnit,
        addXyz(vel, scaleXyz(decelerationVector, deltaMS)),
      ) < 0
    ) ?
      // applying full deceleration would go past zero and start moving in the opposite direction
      // vel here is wrong - should be the component of vel in the direction of deceleration!
      scaleXyz(velocityComponentInDirection, -1 / deltaMS)
      // maximum deceleration wouldn't take past zero so return that
    : decelerationVector;
};
