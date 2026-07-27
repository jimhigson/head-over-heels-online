import { nearestQuarterAngle } from "./cameraAngleVectors";
import { rotateXy } from "./rotateXy";
import {
  type AxisXy,
  cameraAngleIsOddQuarterTurn,
  type DirectionIndexXy4,
  type DirectionIndexXy8,
  mirrorDirectionIndexXy4,
  mirrorDirectionIndexXy8,
  nonZeroClosestDirectionIndexXy4,
  nonZeroClosestDirectionIndexXy8,
  rotateAxisXyByCameraAngle,
  type Xy,
} from "./vectors";

/**
 * for resolveCameraRelative(Xy4|Xy8):
 *    * optionally reflect a world-space
 *    * rotate it by the camera angle, and hand the two resulting components to `name`. The
 * components are passed as numbers, not an Xy, so a direction-naming caller
 * allocates nothing on the per-facing-item render path.
 */
const reflectedThenRotated = <N extends number>(
  facing: Xy,
  cameraAngle: Xy,
  isReflection: boolean,
  vectorToIndex: (x: number, y: number) => N,
): N => {
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
  return vectorToIndex(
    fx * cameraAngle.x - fy * cameraAngle.y,
    fx * cameraAngle.y + fy * cameraAngle.x,
  );
};

/**
 * resolve which index to render at for sprites with 4 directions
 */
export const resolveCameraRelativeIndexXy4 = (
  facing: Xy,
  cameraAngle: Xy,
  isReflection: boolean,
): DirectionIndexXy4 => {
  return reflectedThenRotated(
    facing,
    cameraAngle,
    isReflection,
    nonZeroClosestDirectionIndexXy4,
  );
};

/**
 * like {@link resolveCameraRelativeIndexXy4} but for 8way rendering
 */
export const resolveCameraRelativeIndexXy8 = (
  facing: Xy,
  cameraAngle: Xy,
  isReflection: boolean,
): DirectionIndexXy8 => {
  return reflectedThenRotated(
    facing,
    cameraAngle,
    isReflection,
    nonZeroClosestDirectionIndexXy8,
  );
};

/**
 * whether directional sprites render horizontally flipped at this camera
 * angle: true on odd quarter turns.
 */
export const spriteFlipXAtAngle = (cameraAngle: Xy): boolean =>
  cameraAngleIsOddQuarterTurn(nearestQuarterAngle(cameraAngle));

/**
 * like {@link resolveCameraRelativeIndexXy4} but also mirrors the sprite in the screen y axis (flipX)
 * for world-relative lighting
 */
export const resolveSpriteDirectionIndexXy4 = (
  facing: Xy,
  cameraAngle: Xy,
  isReflection: boolean,
): DirectionIndexXy4 => {
  const apparentIndex = resolveCameraRelativeIndexXy4(
    facing,
    cameraAngle,
    isReflection,
  );
  return spriteFlipXAtAngle(cameraAngle) ?
      mirrorDirectionIndexXy4(apparentIndex)
    : apparentIndex;
};

/**
 * like {@link resolveCameraRelativeIndexXy8} but also mirrors the sprite in the screen y axis (flipX)
 * for world-relative lighting
 */
export const resolveSpriteDirectionIndexXy8 = (
  facing: Xy,
  cameraAngle: Xy,
  isReflection: boolean,
): DirectionIndexXy8 => {
  const apparentIndex = resolveCameraRelativeIndexXy8(
    facing,
    cameraAngle,
    isReflection,
  );
  return spriteFlipXAtAngle(cameraAngle) ?
      mirrorDirectionIndexXy8(apparentIndex)
    : apparentIndex;
};

/**
 * whether a world x/y axis, once rotated by the camera angle, projects in the
 * opposite screen direction to the base-angle projection of the axis it now
 * renders as. So sprite art extends/tiles from its anchor in the rendered axis's
 * base screen direction, so when the world axis projects reversed the art
 * hangs on the wrong side of its anchor and needs shifting back over its
 * footprint.
 */
export const axisProjectsReversed = (axis: AxisXy, cameraAngle: Xy): boolean =>
  rotateXy(axis === "x" ? { x: 1, y: 0 } : { x: 0, y: 1 }, cameraAngle)[
    rotateAxisXyByCameraAngle(axis, cameraAngle)
  ] < 0;
