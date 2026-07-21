import { Color } from "pixi.js";

import jsonPalette from "../../_generated/palette/spritesheetPalette.json" with { type: "json" };
import jsonPaletteDim from "../../_generated/palette/spritesheetPaletteDim.json" with { type: "json" };
import jsonToppyPalette from "../../_generated/palette/spritesheetToppyPalette.json" with { type: "json" };
import { type NamedColours } from "../../utils/palette/palette";
import { transformObject } from "../../utils/transformObject";
import {
  type EffectColourName,
  type SpritesheetMetadata,
} from "../spritesheet/spritesheetData/spritesheetMetaData";

export const paletteBlockstack = transformObject(
  jsonPalette,
  ([key, hexStr]) => [key, new Color(hexStr)],
);
if (import.meta.env.DEV) {
  Object.freeze(paletteBlockstack);
}
export const paletteBlockstackDim = transformObject(
  jsonPaletteDim,
  ([key, hexStr]) => [key, new Color(hexStr)],
);
if (import.meta.env.DEV) {
  Object.freeze(paletteBlockstackDim);
}
export type BlockstackPaletteColourName = keyof typeof paletteBlockstack;

export const paletteToppy = transformObject(
  jsonToppyPalette,
  ([key, hexStr]) => [key, new Color(hexStr)],
);
if (import.meta.env.DEV) {
  Object.freeze(paletteToppy);
}
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
