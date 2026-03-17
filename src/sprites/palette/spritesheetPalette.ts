import { Color } from "pixi.js";

import type { NamedColours } from "../../utils/palette/palette";
import type {
  EffectColourName,
  SpritesheetMetadata,
} from "../spritesheet/spritesheetData/spritesheetMetaData";

import jsonPalette from "../../_generated/palette/spritesheetPalette.json" with { type: "json" };
import jsonPaletteDim from "../../_generated/palette/spritesheetPaletteDim.json" with { type: "json" };
import jsonToppyPalette from "../../_generated/palette/spritesheetToppyPalette.json" with { type: "json" };
import { transformObject } from "../../utils/transformObject";

export const paletteBlockstack = Object.freeze(
  transformObject(jsonPalette, ([key, hexStr]) => [key, new Color(hexStr)]),
);
export const paletteBlockstackDim = Object.freeze(
  transformObject(jsonPaletteDim, ([key, hexStr]) => [key, new Color(hexStr)]),
);
export type BlockstackPaletteColourName = keyof typeof paletteBlockstack;

export const paletteToppy = Object.freeze(
  transformObject(jsonToppyPalette, ([key, hexStr]) => [
    key,
    new Color(hexStr),
  ]),
);
export type ToppyPaletteColourName = keyof typeof paletteToppy;

export const maybeDimPalette = <PaletteColourName extends string = string>(
  spritesheetMeta: SpritesheetMetadata<PaletteColourName>,
  wantDimmedPalette: boolean,
): NamedColours<PaletteColourName> =>
  wantDimmedPalette && spritesheetMeta.paletteDim !== undefined ?
    spritesheetMeta.paletteDim
  : spritesheetMeta.palette;

export const effectColour = <PaletteColourName extends string = string>(
  spritesheetMeta: SpritesheetMetadata<PaletteColourName>,
  wantDimmedPalette: boolean,
  effectColourName: EffectColourName,
): Color => {
  const colourName: PaletteColourName =
    spritesheetMeta.effectColours[effectColourName];

  return maybeDimPalette(spritesheetMeta, wantDimmedPalette)[colourName];
};
