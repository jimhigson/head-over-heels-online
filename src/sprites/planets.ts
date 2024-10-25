export const planets = {
  jail: { walls: ["bars"] },
  blacktooth: { walls: ["armour", "shield", "plain"] },
  bookworld: { walls: ["person", "book"] },
  egyptus: { walls: ["sarcophagus", "hieroglyphics"] },
  market: { walls: ["passage", "fruits", "more-fruits"] },
  moonbase: { walls: ["window1", "window2", "window3", "coil"] },
  penitentiary: { walls: ["loop", "skeleton"] },
  safari: { walls: ["window", "shield", "wall"] },
} as const satisfies Record<string, { walls: string[] }>;

export type PlanetName = keyof typeof planets;
export const planetNames = Object.keys(planets) as PlanetName[];

export type AllPlanets = typeof planets;
export type Wall<P extends PlanetName> =
  | AllPlanets[P]["walls"][number]
  /**
   * none means render nothing in this space - if this is a mistake in the xml,
   * overide it with jsonpatch
   */
  | "none";
