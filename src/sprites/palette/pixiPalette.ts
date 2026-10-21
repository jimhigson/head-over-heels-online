import { type Color } from "pixi.js";

import { type NamedPixiColours } from "../../utils/palette/palette";
import {
  type EffectColourName,
  type SpritesheetMetadata,
} from "../spritesheet/spritesheetData/spritesheetMetaData";
import {
  type PixiPalettes,
  spritesheetPixiPalettes,
} from "./spritesheetPixiPalettes";

/**
 * whichever of a spritesheet's palettes applies, keeping that sheet's colour
 * names
 */
export const maybeDimPixiPalette = <PaletteColourName extends string>(
  { basic, dim }: PixiPalettes<PaletteColourName>,
  wantDimmedPalette: boolean,
): NamedPixiColours<PaletteColourName> =>
  wantDimmedPalette && dim !== undefined ? dim : basic;

export const effectPixiColour = (
  spritesheetMeta: SpritesheetMetadata,
  wantDimmedPalette: boolean,
  effectColourName: EffectColourName,
): Color =>
  maybeDimPixiPalette<string>(
    spritesheetPixiPalettes[spritesheetMeta.name],
    wantDimmedPalette,
  )[spritesheetMeta.effectColours[effectColourName]];
