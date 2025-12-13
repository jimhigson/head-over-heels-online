import type { Color } from "pixi.js";

import type { SpritesheetPaletteColourName } from "../../../../../../gfx/spritesheetPalette";

import { spritesheetPalette } from "../../../../../../gfx/spritesheetPalette";
import { entries } from "../../../../../utils/entries";
import { voronoiLut } from "../voronoiLut";

const excludeList: SpritesheetPaletteColourName[] = [
  "alpha",
  "replaceDark",
  "replaceLight",
];

function* paletteColors(): Generator<[Color, Color]> {
  for (const [name, color] of entries(spritesheetPalette)) {
    if (!excludeList.includes(name)) {
      yield [color, color];
    }
  }
}

/**
 * Pre-baked LUT that quantizes colors to the nearest color in the spritesheet palette.
 * Maps each color in RGB space to the closest color from spritesheetPalette.
 */
const paletteQuantisationLutStart = performance.now();
export const paletteQuantisationLut = voronoiLut(new Map([...paletteColors()]));
const paletteQuantisationLutEnd = performance.now();
console.log(
  `paletteQuantisationLut: ${(paletteQuantisationLutEnd - paletteQuantisationLutStart).toFixed(2)}ms`,
);
