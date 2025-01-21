import type { Subset } from "../utils/subset";

export const scenery = {
  jail: { walls: ["bars"] },
  blacktooth: { walls: ["armour", "shield", "plain"] },
  bookworld: { walls: ["cowboy", "book"] },
  egyptus: { walls: ["sarcophagus", "hieroglyphics"] },
  market: { walls: ["passage", "fruits", "more-fruits"] },
  moonbase: { walls: ["window1", "window2", "window3", "coil"] },
  penitentiary: { walls: ["loop", "skeleton"] },
  safari: { walls: ["window", "shield", "wall"] },
} as const satisfies Record<string, { walls: string[] }>;

export type SceneryName = keyof typeof scenery;
export const sceneryNames = Object.keys(scenery) as SceneryName[];

export const planets = [
  "blacktooth",
  "penitentiary",
  "bookworld",
  "egyptus",
  "safari",
] as const;

export type PlanetName = Subset<SceneryName, (typeof planets)[number]>;

export type AllScenery = typeof scenery;
export type Wall<P extends SceneryName> =
  | AllScenery[P]["walls"][number]
  /**
   * none means render nothing in this space - if this is a mistake in the xml,
   * override it with jsonpatch
   */
  | "none";
