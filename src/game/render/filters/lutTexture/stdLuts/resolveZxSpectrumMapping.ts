import { type Color } from "pixi.js";

import {
  type ZxSpectrumPaletteColour,
  zxSpectrumPaletteColours,
} from "../../../../../originalGame";
import { type SpritesheetMetadata } from "../../../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { objectEntriesIter } from "../../../../../utils/entries";
import { resolveSwops } from "../../../../../utils/palette/palette";

type ZxSpectrumMappingProperty =
  | "mapToZxSpectrumForDeathEffectPalette"
  | "mapToZxSpectrumPalette";

/** resolves a spritesheet meta's spectrum colour name mapping into a `Map<Color, Color>` */
export const resolveZxSpectrumMapping = (
  meta: SpritesheetMetadata,
  property: ZxSpectrumMappingProperty = "mapToZxSpectrumPalette",
): Map<Color, Color> => {
  const mapping = meta[property]!;
  const targetColours: Partial<Record<string, Color>> = {};
  for (const [name, spectrumName] of objectEntriesIter(mapping)) {
    targetColours[name] =
      zxSpectrumPaletteColours[spectrumName as ZxSpectrumPaletteColour];
  }
  return resolveSwops(meta.palette, targetColours);
};
