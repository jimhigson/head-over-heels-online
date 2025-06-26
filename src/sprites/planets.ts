import type { Subset } from "../utils/subset";

export const wallTiles = {
  jail: ["bars"],
  blacktooth: ["armour", "shield", "plain"],
  bookworld: ["cowboy", "book"],
  egyptus: ["sarcophagus", "hieroglyphics"],
  market: ["passage", "fruits", "more-fruits"],
  moonbase: ["window1", "window2", "window3", "coil"],
  penitentiary: ["loop", "skeleton"],
  safari: ["window", "shield", "wall"],
} as const satisfies Record<string, string[]>;

export type SceneryName = keyof typeof wallTiles;
export const sceneryNames = Object.keys(wallTiles) as SceneryName[];

export const planets = [
  "blacktooth",
  "penitentiary",
  "bookworld",
  "egyptus",
  "safari",
] as const;

export type PlanetName = Subset<SceneryName, (typeof planets)[number]>;

export type AllScenery = typeof wallTiles;
export type Wall<S extends SceneryName> = AllScenery[S][number];
