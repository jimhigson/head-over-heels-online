import { type SceneryName, type Wall } from "../../sprites/planets";
import { type DirectionXy4 } from "../../utils/vectors/vectors";

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

export const isWallHidden = (direction: DirectionXy4) => {
  return direction === "towards" || direction === "right";
};
