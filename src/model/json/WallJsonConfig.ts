import type { SceneryName, Wall } from "../../sprites/planets";
import type { DirectionXy4, Xy } from "../../utils/vectors/vectors";

/**
 * a view of the wall json config type that locks it down to protect against
 * mistakes, especially when editing static room json
 */
export type WallJsonConfig<ScN extends SceneryName> =
  | {
      direction: "away";
      times?: { x: number };
      tiles: Array<Wall<ScN>>;
    }
  | {
      direction: "left";
      times?: { y: number };
      tiles: Array<Wall<ScN>>;
    }
  | {
      direction: "towards";
      times?: { x: number };
    }
  | {
      direction: "right";
      times?: { y: number };
    };

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
