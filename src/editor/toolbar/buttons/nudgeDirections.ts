import { rotateXyzByInverseCameraAngle } from "../../../utils/vectors/cameraAngleVectors";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  type AxisXy,
  type AxisXyz,
  type DirectionXy4,
  originXyz,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";

/**
 * arguments for a nudge (as taken by the move/resize preview): an optional
 * position delta plus an optional times (size) delta, in physical world axes
 */
export type NudgeArgs = {
  posVector?: Xyz;
  timesDelta?: Partial<Xyz>;
};

/**
 * the physical (world) direction that renders in the given apparent (screen)
 * direction at the current camera angle - the nudge buttons/arrow keys are
 * labelled with screen directions, so pressing ← always moves toward the
 * screen's upper-left whichever world axis that currently is
 */
export const apparentMoveVector = (
  apparentDirection: DirectionXy4,
  cameraAngle: Xy,
): Xyz =>
  rotateXyzByInverseCameraAngle(unitVectors[apparentDirection], cameraAngle);

/** the world axis the given apparent direction acts on at the current angle */
export const apparentNudgeAxis = (
  apparentDirection: DirectionXy4,
  cameraAngle: Xy,
): AxisXy =>
  apparentMoveVector(apparentDirection, cameraAngle).x === 0 ? "y" : "x";

/**
 * the world axis a world direction (a unit vector) lies along
 */
export const directionAxis = (direction: Xyz): AxisXyz =>
  direction.x !== 0 ? "x"
  : direction.y !== 0 ? "y"
  : "z";

/**
 * grow so the edge facing the given world direction travels outward:
 * growing on a negative side also shifts the position back so the opposite
 * edge stays put
 */
export const growArgs = (direction: Xyz): NudgeArgs => {
  const axis = directionAxis(direction);
  return direction[axis] > 0 ?
      { timesDelta: { [axis]: 1 } }
    : { posVector: { ...originXyz, [axis]: -1 }, timesDelta: { [axis]: 1 } };
};

/**
 * shrink so the edge opposite the given world direction travels inward:
 * shrinking away from a positive side also shifts the position so the far
 * edge stays put
 */
export const shrinkArgs = (direction: Xyz): NudgeArgs => {
  const axis = directionAxis(direction);
  return direction[axis] < 0 ?
      { timesDelta: { [axis]: -1 } }
    : { posVector: { ...originXyz, [axis]: 1 }, timesDelta: { [axis]: -1 } };
};

/**
 * grow the selection so its edge travels outward in the given apparent
 * direction
 */
export const apparentGrowArgs = (
  apparentDirection: DirectionXy4,
  cameraAngle: Xy,
): NudgeArgs => growArgs(apparentMoveVector(apparentDirection, cameraAngle));

/**
 * shrink the selection so its edge travels inward from the side opposite the
 * given apparent direction
 */
export const apparentShrinkArgs = (
  apparentDirection: DirectionXy4,
  cameraAngle: Xy,
): NudgeArgs => shrinkArgs(apparentMoveVector(apparentDirection, cameraAngle));
