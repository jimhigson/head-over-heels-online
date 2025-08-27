import type { SceneryName, Wall } from "../../sprites/planets";
import type { DirectionXy4, Xy } from "../../utils/vectors/vectors";

export type AwayWallConfig<ScN extends SceneryName> = {
  /** this wall would normally be found/rendered on the away side of the room */
  direction: "away";
  /** the tiles to show - the length of this array also determines the size of the wall */
  tiles: Array<Wall<ScN>>;
};

export type LeftWallConfig<ScN extends SceneryName> = {
  /** this wall would normally be found/rendered on the left side of the room */
  direction: "left";
  /** the tiles to show - the length of this array also determines the size of the wall */
  tiles: Array<Wall<ScN>>;
};

export type TowardsWallConfig = {
  /** this wall would normally be found on the (invisible) towards side of the room */
  direction: "towards";
  times?: {
    x: number;
  };
};

/** this wall would normally be found on the (invisible) right side of the room */
export type RightWallConfig = {
  direction: "right";
  times?: {
    y: number;
  };
};

/**
 * a view of the wall json config type that locks it down to protect against
 * mistakes, especially when editing static room json
 */
export type WallJsonConfig<ScN extends SceneryName = SceneryName> =
  | AwayWallConfig<ScN>
  | LeftWallConfig<ScN>
  | RightWallConfig
  | TowardsWallConfig;

export type WallJsonConfigWithTiles<ScN extends SceneryName> = Extract<
  WallJsonConfig<ScN>,
  { tiles: Array<Wall<ScN>> }
>;

/**
 * a view of the wall json config type for dynamic/programmatic room editing without having to
 * do a bunch of fussy casts, but protects against fewer mistakes
 */
export type AnyWallJsonConfig<ScN extends SceneryName = SceneryName> = {
  direction: DirectionXy4;
  times?: Partial<Xy>;
  tiles?: Array<Wall<ScN>>;
};

export const isWallHidden = (direction: DirectionXy4) => {
  return direction === "towards" || direction === "right";
};
