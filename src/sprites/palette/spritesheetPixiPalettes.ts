import { blockStackSpritesheetMeta } from "../../../gfx/spritesheetMeta/blockStackSpritesheetMeta";
import { debugSpritesheetMeta } from "../../../gfx/spritesheetMeta/debugSpritesheetMeta";
import { speccySpritesheetMeta } from "../../../gfx/spritesheetMeta/speccySpritesheetMeta";
import { toppySpritesheetMeta } from "../../../gfx/spritesheetMeta/toppySpritesheetMeta";
import { type NamedPixiColours } from "../../utils/palette/palette";
import {
  type SpritesheetMetadata,
  type SpritesheetMetaPaletteName,
} from "../spritesheet/spritesheetData/spritesheetMetaData";
import { toPixiPalette } from "./toPixiPalette";

export type PixiPalettes<ColourName extends string> = {
  palette: NamedPixiColours<ColourName>;
  paletteDim: NamedPixiColours<ColourName> | undefined;
};

const pixiPalettesFor = <ColourName extends string>(
  spritesheetMeta: SpritesheetMetadata<ColourName, string>,
): PixiPalettes<ColourName> => ({
  palette: toPixiPalette(spritesheetMeta.palette),
  paletteDim:
    spritesheetMeta.paletteDim === undefined ?
      undefined
    : toPixiPalette(spritesheetMeta.paletteDim),
});

/**
 * every spritesheet meta's palettes as pixi `Color`s, converted once. Swop
 * maps are keyed by these exact instances, so every pixi palette must come
 * from here
 */
export const spritesheetPixiPalettes: Record<
  SpritesheetMetaPaletteName,
  PixiPalettes<string>
> = {
  blockstack: pixiPalettesFor(blockStackSpritesheetMeta),
  speccy: pixiPalettesFor(speccySpritesheetMeta),
  toppy: pixiPalettesFor(toppySpritesheetMeta),
  debug: pixiPalettesFor(debugSpritesheetMeta),
};
