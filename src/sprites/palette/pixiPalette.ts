import { type Color } from "pixi.js";

import { blockStackSpritesheetMeta } from "../../../gfx/spritesheetMeta/blockStackSpritesheetMeta";
import { toppySpritesheetMeta } from "../../../gfx/spritesheetMeta/toppySpritesheetMeta";
import { type NamedPixiColours } from "../../utils/palette/palette";
import {
  type EffectColourName,
  type SpritesheetMetadata,
} from "../spritesheet/spritesheetData/spritesheetMetaData";
import {
  type PixiPalettes,
  spritesheetPixiPalettes,
} from "./spritesheetPixiPalettes";

const pixiPalettesOf = <PaletteColourName extends string>(
  spritesheetMeta: SpritesheetMetadata<PaletteColourName>,
) =>
  // looked up by a runtime key, so this spritesheet meta's colour names are
  // restored here
  spritesheetPixiPalettes[
    spritesheetMeta.paletteName
  ] as PixiPalettes<PaletteColourName>;

/**
 * a spritesheet's palette as pixi `Color`s
 */
export const pixiPalette = <PaletteColourName extends string>(
  spritesheetMeta: SpritesheetMetadata<PaletteColourName>,
): NamedPixiColours<PaletteColourName> =>
  pixiPalettesOf(spritesheetMeta).palette;

/**
 * the renderer's view of whichever of a spritesheet's palettes applies
 */
export const maybeDimPixiPalette = <PaletteColourName extends string>(
  spritesheetMeta: SpritesheetMetadata<PaletteColourName>,
  wantDimmedPalette: boolean,
): NamedPixiColours<PaletteColourName> => {
  const { palette, paletteDim } = pixiPalettesOf(spritesheetMeta);
  return wantDimmedPalette && paletteDim !== undefined ? paletteDim : palette;
};

export const effectPixiColour = <PaletteColourName extends string>(
  spritesheetMeta: SpritesheetMetadata<PaletteColourName>,
  wantDimmedPalette: boolean,
  effectColourName: EffectColourName,
): Color =>
  maybeDimPixiPalette(spritesheetMeta, wantDimmedPalette)[
    spritesheetMeta.effectColours[effectColourName]
  ];

export const pixiPaletteBlockstack = pixiPalette(blockStackSpritesheetMeta);
export const pixiPaletteBlockstackDim = maybeDimPixiPalette(
  blockStackSpritesheetMeta,
  true,
);
export const pixiPaletteToppy = pixiPalette(toppySpritesheetMeta);
