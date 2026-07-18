import { type SceneryName, type Wall } from "../../sprites/planets";
import {
  type DirectionXy4,
  type Xy,
  type Xyz,
} from "../../utils/vectors/vectors";

/**
 * the json config for a wall.
 *
 * every wall has tiles, regardless of which side of the room it is on - the
 * length of the tiles array gives the length of the wall along its tangent axis.
 * which sides of the room are visible depends on the wall's direction and, at
 * render time, the camera angle (a wall that is on an invisible near side at the
 * original camera angle becomes visible once the camera rotates to face it)
 */
export type WallJsonConfig<ScN extends SceneryName = SceneryName> = {
  direction: DirectionXy4;
  /** the tiles to show - the length of this array also determines the size of the wall */
  tiles: Array<Wall<ScN>>;
};

/**
 * whether a wall with the given physical direction (an in-play cardinal unit
 * vector) is one of the two hidden (camera-facing, undrawn) walls at the given
 * camera angle. Pure - the room model holds nothing angle-dependent;
 * hidden-ness is derived wherever it is consumed. On the hot z-sort path, so
 * the direction is rotated inline without allocating: hidden ⟺ the rotated
 * vector lies in the {towards, right} half-plane (x + y < 0)
 */
export const isWallDirectionHiddenAtAngle = (
  direction: Xyz,
  cameraAngle: Xy,
): boolean => {
  return (
    direction.x * cameraAngle.x -
      direction.y * cameraAngle.y +
      (direction.x * cameraAngle.y + direction.y * cameraAngle.x) <
    0
  );
};
