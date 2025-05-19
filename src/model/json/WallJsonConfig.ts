import type { SceneryName, Wall } from "../../sprites/planets";

// export type WallJsonConfig<
//   ScN extends SceneryName,
//   D extends Direction4Xyz = Direction4Xyz,
// > = {
//   direction: D;
//   times?: D extends "away" | "towards" ?
//     {
//       x: number;
//     }
//   : {
//       y: number;
//     };
// } & (D extends "away" | "left" ? { tiles: Array<Wall<ScN>> }
// : {
//     tiles?: undefined;
//   });

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
