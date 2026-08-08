import { rotateXyzByInverseCameraAngle } from "../../../utils/vectors/cameraAngleVectors";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  type AxisXy,
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
 * grow the selection so its edge travels outward in the given apparent
 * direction: growing on a negative side also shifts the position back so the
 * opposite edge stays put
 */
export const apparentGrowArgs = (
  apparentDirection: DirectionXy4,
  cameraAngle: Xy,
): NudgeArgs => {
  const p = apparentMoveVector(apparentDirection, cameraAngle);
  const axis = apparentNudgeAxis(apparentDirection, cameraAngle);
  return p[axis] > 0 ?
      { timesDelta: { [axis]: 1 } }
    : { posVector: { ...originXyz, [axis]: -1 }, timesDelta: { [axis]: 1 } };
};

/**
 * shrink the selection so its edge travels inward from the side opposite the
 * given apparent direction: shrinking away from a positive side also shifts
 * the position so the far edge stays put
 */
export const apparentShrinkArgs = (
  apparentDirection: DirectionXy4,
  cameraAngle: Xy,
): NudgeArgs => {
  const p = apparentMoveVector(apparentDirection, cameraAngle);
  const axis = apparentNudgeAxis(apparentDirection, cameraAngle);
  return p[axis] < 0 ?
      { timesDelta: { [axis]: -1 } }
    : { posVector: { ...originXyz, [axis]: 1 }, timesDelta: { [axis]: -1 } };
};
