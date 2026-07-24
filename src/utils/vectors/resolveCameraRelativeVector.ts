import { nearestQuarterAngle } from "./rotateXy";
import {
  cameraAngleIsOddQuarterTurn,
  type DirectionIndexXy4,
  type DirectionIndexXy8,
  nonZeroClosestDirectionIndexXy4,
  nonZeroClosestDirectionIndexXy8,
  type Xy,
} from "./vectors";

/**
 * the shared core of the resolveCameraRelative* family: reflect a world-space
 * facing in the reflection plane (when drawn as a reflection), then rotate it
 * by the camera angle, and hand the two resulting components to `name`. The
 * components are passed as numbers, not an Xy, so a direction-naming caller
 * allocates nothing on the per-facing-item render path.
 *
 * The camera angle may be any continuous angle (mid-turn) - exactness is kept
 * throughout; callers round only at their final direction-name pick. The
 * reflection-pane choice is inherently a per-quarter decision (reflections are
 * only shown in the pane rendered face-on: world awayRight normally, awayLeft
 * when an odd quarter turn shows the orientations swapped), so that sub-decision
 * snaps internally. Reflection (a component swap) and rotation (a complex
 * multiply) are inlined so no intermediate vector is allocated.
 */
const reflectedThenRotated = <T>(
  facing: Xy,
  cameraAngle: Xy,
  isReflection: boolean,
  name: (x: number, y: number) => T,
): T => {
  // reflections swap x↔y: preserving sign in the awayLeft pane (shown on odd
  // quarter turns), inverting in the awayRight pane:
  const oddPane =
    isReflection &&
    cameraAngleIsOddQuarterTurn(nearestQuarterAngle(cameraAngle));
  const fx =
    !isReflection ? facing.x
    : oddPane ? facing.y
    : -facing.y;
  const fy =
    !isReflection ? facing.y
    : oddPane ? facing.x
    : -facing.x;
  return name(
    fx * cameraAngle.x - fy * cameraAngle.y,
    fx * cameraAngle.y + fy * cameraAngle.x,
  );
};

/**
 * a world-space facing resolved to the even-octant ring index
 * (`.d0`/`.d2`/`.d4`/`.d6`) of the 4-way direction it *appears* as on screen
 * (reflected when a reflection, then rotated by the camera angle) - for
 * building a `.dN` sprite id from the apparent facing, so the sprite variant
 * swaps as the camera turns.
 */
export const resolveCameraRelativeIndexXy4 = (
  facing: Xy,
  cameraAngle: Xy,
  isReflection: boolean,
): DirectionIndexXy4 =>
  reflectedThenRotated(
    facing,
    cameraAngle,
    isReflection,
    nonZeroClosestDirectionIndexXy4,
  );

/** like {@link resolveCameraRelativeIndexXy4} for the 8-way (`.d0`..`.d7`) ring */
export const resolveCameraRelativeIndexXy8 = (
  facing: Xy,
  cameraAngle: Xy,
  isReflection: boolean,
): DirectionIndexXy8 =>
  reflectedThenRotated(
    facing,
    cameraAngle,
    isReflection,
    nonZeroClosestDirectionIndexXy8,
  );
