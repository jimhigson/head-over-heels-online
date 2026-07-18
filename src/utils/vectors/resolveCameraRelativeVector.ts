import { nearestQuarterAngle } from "./rotateXy";
import {
  cameraAngleIsOddQuarterTurn,
  type DirectionXy4,
  type DirectionXy8,
  nonZeroClosestDirectionXy4,
  nonZeroClosestDirectionXy8,
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
 * a world-space facing resolved to the nearest 4-way direction name of how it
 * appears on screen (reflected when drawn as a reflection, then rotated by the
 * camera angle) - for the common appearance idiom of resolving a facing
 * straight to a sprite name, without allocating an intermediate vector.
 */
export const resolveCameraRelativeVectorXy4 = (
  facing: Xy,
  cameraAngle: Xy,
  isReflection: boolean,
): DirectionXy4 =>
  reflectedThenRotated(
    facing,
    cameraAngle,
    isReflection,
    nonZeroClosestDirectionXy4,
  );

/**
 * like {@link resolveCameraRelativeVectorXy4}, but resolves to the nearest
 * 8-way direction (reusing {@link nonZeroClosestDirectionXy8}) - again without
 * allocating the intermediate vector.
 */
export const resolveCameraRelativeVectorXy8 = (
  facing: Xy,
  cameraAngle: Xy,
  isReflection: boolean,
): DirectionXy8 =>
  reflectedThenRotated(
    facing,
    cameraAngle,
    isReflection,
    nonZeroClosestDirectionXy8,
  );
