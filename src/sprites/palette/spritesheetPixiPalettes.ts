import { type NamedPixiColours } from "../../utils/palette/palette";
import {
  type SpritesheetMetadata,
  type SpritesheetMetas,
  spritesheetMetas,
  type SpritesheetName,
} from "../spritesheet/spritesheetData/spritesheetMetaData";
import { toPixiPalette } from "./toPixiPalette";

export type PixiPalettes<ColourName extends string> = {
  basic: NamedPixiColours<ColourName>;
  dim: NamedPixiColours<ColourName> | undefined;
};

const pixiPalettesFor = <ColourName extends string>({
  palettes: { basic, dim },
}: SpritesheetMetadata<ColourName>): PixiPalettes<ColourName> => ({
  basic: toPixiPalette(basic),
  dim: dim === undefined ? undefined : toPixiPalette(dim),
});

export type SpritesheetPixiPalettes = {
  [Name in SpritesheetName]: PixiPalettes<
    keyof SpritesheetMetas[Name]["palettes"]["basic"] & string
  >;
};

export const blockstackPixiPalettes = pixiPalettesFor(
  spritesheetMetas.blockstack,
);
export const speccyPixiPalettes = pixiPalettesFor(spritesheetMetas.speccy);
export const toppyPixiPalettes = pixiPalettesFor(spritesheetMetas.toppy);
export const debugPixiPalettes = pixiPalettesFor(spritesheetMetas.debug);

/**
 * every spritesheet's palettes as pixi `Color`s, converted once. Swop maps are
 * keyed by these exact instances, so every pixi palette must come from here -
 * either this table, or the same palettes under their own names above
 */
export const spritesheetPixiPalettes: SpritesheetPixiPalettes = {
  blockstack: blockstackPixiPalettes,
  speccy: speccyPixiPalettes,
  toppy: toppyPixiPalettes,
  debug: debugPixiPalettes,
};
