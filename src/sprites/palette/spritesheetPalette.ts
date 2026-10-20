import jsonBlockstackPalette from "../../_generated/palette/spritesheetBlockstackPalette.json" with { type: "json" };
import jsonBlockstackPaletteDim from "../../_generated/palette/spritesheetBlockstackPaletteDim.json" with { type: "json" };
import jsonToppyPalette from "../../_generated/palette/spritesheetToppyPalette.json" with { type: "json" };
import { type HexColour } from "../../utils/colour/HexColour";
import { type NamedHexColours } from "../../utils/palette/palette";
import {
  type EffectColourName,
  type SpritesheetMetadata,
} from "../spritesheet/spritesheetData/spritesheetMetaData";

// the generator writes only hex codes, but json imports type them as string
export const paletteBlockstackHex = Object.freeze(
  jsonBlockstackPalette as NamedHexColours<keyof typeof jsonBlockstackPalette>,
);
export const paletteBlockstackDimHex = Object.freeze(
  jsonBlockstackPaletteDim as NamedHexColours<
    keyof typeof jsonBlockstackPaletteDim
  >,
);
export type BlockstackPaletteColourName = keyof typeof paletteBlockstackHex;

export const paletteToppyHex = Object.freeze(
  jsonToppyPalette as NamedHexColours<keyof typeof jsonToppyPalette>,
);
export type ToppyPaletteColourName = keyof typeof paletteToppyHex;

export const maybeDimPalette = <PaletteColourName extends string>(
  { palettes: { basic, dim } }: SpritesheetMetadata<PaletteColourName>,
  wantDimmedPalette: boolean,
): NamedHexColours<PaletteColourName> =>
  wantDimmedPalette && dim !== undefined ? dim : basic;

export const effectColour = <PaletteColourName extends string>(
  spritesheetMeta: SpritesheetMetadata<PaletteColourName>,
  wantDimmedPalette: boolean,
  effectColourName: EffectColourName,
): HexColour => {
  const colourName: PaletteColourName =
    spritesheetMeta.effectColours[effectColourName];

  return maybeDimPalette(spritesheetMeta, wantDimmedPalette)[colourName];
};
