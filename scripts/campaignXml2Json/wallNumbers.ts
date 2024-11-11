import type { PlanetName, Wall } from "../../src/sprites/planets";

/**
 * the walls are numbered in the xml - convert from the numbers to my names (which
 * are ordered by how they appear on the hohjs spitesheet)
 *
 * based on: https://github.com/dougmencken/HeadOverHeels/tree/master/gamedata/gfx
 */
export const wallNumbers: { [P in PlanetName]: Array<Wall<P>> } = {
  blacktooth: ["plain", "shield", "armour"],
  bookworld: ["book", "person"],
  egyptus: ["hieroglyphics", "sarcophagus"],
  jail: ["bars"],
  market: ["passage", "more-fruits", "fruits"],
  moonbase: ["coil", "window2", "window3", "window1"],
  penitentiary: ["loop", "skeleton"],
  safari: ["wall", "shield", "window"],
};
