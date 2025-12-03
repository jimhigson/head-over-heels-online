import { Color } from "pixi.js";

import jsonPalette from "../../_generated/palette/spritesheetPalette.json" with { type: "json" };
import jsonPaletteDim from "../../_generated/palette/spritesheetPaletteDim.json" with { type: "json" };
import { transformObject } from "../../utils/entries";

export type SpritesheetPaletteColourName = keyof typeof jsonPalette;

export const spritesheetPalette = Object.freeze(
  transformObject(jsonPalette, ([key, hexStr]) => [key, new Color(hexStr)]),
);

export const spritesheetPaletteDim = Object.freeze(
  transformObject(jsonPaletteDim, ([key, hexStr]) => [key, new Color(hexStr)]),
);

export const getSpritesheetPalette = (inDimmedPalette: boolean) =>
  inDimmedPalette ? spritesheetPaletteDim : spritesheetPalette;
