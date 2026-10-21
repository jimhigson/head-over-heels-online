import { type Color } from "pixi.js";

import { type ZxSpectrumPaletteColour } from "../../../../../originalGame";
import { spritesheetPixiPalettes } from "../../../../../sprites/palette/spritesheetPixiPalettes";
import { type SpritesheetMetadata } from "../../../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { objectEntriesIter } from "../../../../../utils/entries";
import { resolveSwops } from "../../../../../utils/palette/palette";
import { zxSpectrumPaletteColours } from "../../../palette/zxSpectrumPixiColours";

type ZxSpectrumMappingProperty =
  "mapToZxSpectrumForDeathEffectPalette" | "mapToZxSpectrumPalette";

/** resolves a spritesheet meta's spectrum colour name mapping into a `Map<Color, Color>` */
export const resolveZxSpectrumMapping = (
  spritesheetMeta: SpritesheetMetadata,
  property: ZxSpectrumMappingProperty = "mapToZxSpectrumPalette",
): Map<Color, Color> => {
  const mapping = spritesheetMeta[property]!;
  const targetColours: Partial<Record<string, Color>> = {};
  for (const [name, spectrumName] of objectEntriesIter(mapping)) {
    targetColours[name] =
      zxSpectrumPaletteColours[spectrumName as ZxSpectrumPaletteColour];
  }
  return resolveSwops<string>(
    spritesheetPixiPalettes[spritesheetMeta.name].basic,
    targetColours,
  );
};
