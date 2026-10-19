import jsonPalette from "../../_generated/palette/spritesheetPalette.json" with { type: "json" };
import jsonPaletteDim from "../../_generated/palette/spritesheetPaletteDim.json" with { type: "json" };
import jsonToppyPalette from "../../_generated/palette/spritesheetToppyPalette.json" with { type: "json" };
import { type HexColour } from "../../utils/colour/HexColour";
import { type NamedHexColours } from "../../utils/palette/palette";
import {
  type EffectColourName,
  type SpritesheetMetadata,
} from "../spritesheet/spritesheetData/spritesheetMetaData";

// the generator writes only hex codes, but json imports type them as string
export const paletteBlockstackHex = Object.freeze(
  jsonPalette as NamedHexColours<keyof typeof jsonPalette>,
);
export const paletteBlockstackDimHex = Object.freeze(
  jsonPaletteDim as NamedHexColours<keyof typeof jsonPaletteDim>,
);
export type BlockstackPaletteColourName = keyof typeof paletteBlockstackHex;

export const paletteToppyHex = Object.freeze(
  jsonToppyPalette as NamedHexColours<keyof typeof jsonToppyPalette>,
);
export type ToppyPaletteColourName = keyof typeof paletteToppyHex;

export const maybeDimPalette = <PaletteColourName extends string>(
  spritesheetMeta: SpritesheetMetadata<PaletteColourName>,
  wantDimmedPalette: boolean,
): NamedHexColours<PaletteColourName> =>
  wantDimmedPalette && spritesheetMeta.paletteDim !== undefined ?
    spritesheetMeta.paletteDim
  : spritesheetMeta.palette;

export const effectColour = <PaletteColourName extends string>(
  spritesheetMeta: SpritesheetMetadata<PaletteColourName>,
  wantDimmedPalette: boolean,
  effectColourName: EffectColourName,
): HexColour => {
  const colourName: PaletteColourName =
    spritesheetMeta.effectColours[effectColourName];

  return maybeDimPalette(spritesheetMeta, wantDimmedPalette)[colourName];
};
