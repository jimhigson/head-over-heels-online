import { type Color } from "pixi.js";

import { type BlockstackPaletteColourName } from "../../../../../sprites/palette/spritesheetPalette";
import { blockstackPixiPalettes } from "../../../../../sprites/palette/spritesheetPixiPalettes";
import { entries } from "../../../../../utils/entries";
import { voronoiLut } from "../voronoiLut";

const normalColours: BlockstackPaletteColourName[] = [
  "pureBlack",
  "shadow",
  "midGrey",
  "lightGrey",
  "white",
  "pastelBlue",
  "metallicBlue",
  "pink",
  "moss",
  "redShadow",
  "midRed",
  "lightBeige",
  "highlightBeige",
];

function* paletteColors(): Generator<[Color, Color]> {
  for (const [name, color] of entries(blockstackPixiPalettes.basic)) {
    if (normalColours.includes(name)) {
      yield [color, color];
    }
  }
}

/**
 * Pre-baked LUT that quantizes colors to the nearest of BlockStack's normal
 * palette colours
 */
const blockstackPaletteQuantisationLutStart = performance.now();
export const blockstackPaletteQuantisationLut = voronoiLut(
  new Map([...paletteColors()]),
);
if (import.meta.env.DEV) {
  console.log(
    `blockstackPaletteQuantisationLut: ${(performance.now() - blockstackPaletteQuantisationLutStart).toFixed(2)}ms`,
  );
}
