import { cycle, drop, take } from "iter-tools-es";

import type { SceneryName } from "../../sprites/planets";

import { type Wall } from "../../sprites/planets";

/**
 * some standard wall patterns that can be repeated for creating the wall tiles
 * in all of the sceneries, using all the tiles and being symmetrical in an 8x8 room
 */
const wallStarterPatterns: { [ScN in SceneryName]: Array<Wall<ScN>> } = {
  jail: ["bars"],
  blacktooth: ["plain", "plain", "armour", "shield", "shield", "armour"],
  bookworld: ["book", "book", "cowboy"],
  egyptus: [
    "hieroglyphics",
    "hieroglyphics",
    "hieroglyphics",
    "sarcophagus",
    "sarcophagus",
  ],
  market: ["passage", "more-fruits", "fruits", "more-fruits", "fruits"],
  moonbase: ["coil", "window1", "window2", "window3"],
  penitentiary: ["loop", "loop", "skeleton"],
  safari: ["wall", "shield", "wall", "window", "window", "wall", "shield"],
};

export const rotatingSceneryTiles = <S extends SceneryName>(
  sceneryName: S,
  numberOfTiles: number,
  startingAtOrdinal: number = 0,
): IterableIterator<Wall<S>> => {
  const pattern = wallStarterPatterns[sceneryName];
  const patternLength = pattern.length;

  // Normalize negative indices by wrapping around the pattern length
  const normalizedStart =
    ((startingAtOrdinal % patternLength) + patternLength) % patternLength;

  const c = cycle(pattern);

  return drop(normalizedStart, take(numberOfTiles + normalizedStart, c));
};
