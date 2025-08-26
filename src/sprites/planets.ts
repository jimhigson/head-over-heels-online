import type { Subset } from "../utils/subset";

export const wallTiles = {
  jail: ["bars"],
  blacktooth: ["plain", "shield", "armour"],
  bookworld: ["book", "cowboy"],
  egyptus: ["hieroglyphics", "sarcophagus"],
  market: ["more-fruits", "fruits", "passage"],
  moonbase: ["coil", "window3", "window2", "window1", "window-clear"],
  penitentiary: ["skeleton", "loop"],
  safari: ["wall", "shield", "window"],
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
