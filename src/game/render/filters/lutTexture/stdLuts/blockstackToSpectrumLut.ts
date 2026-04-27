import { type Texture } from "pixi.js";

import {
  zxSpectrumColors,
  zxSpectrumColorsDimmed,
} from "../../../../../originalGame";
import { paletteBlockstack } from "../../../../../sprites/palette/spritesheetPalette";
import { resolveSwops } from "../../../../../utils/palette/palette";
import { sparseLut } from "../sparseLut";

export const blockstackPaletteToSpectrumMapping = resolveSwops(
  paletteBlockstack,
  {
    moss: zxSpectrumColors.green,
    pink: zxSpectrumColors.magenta,
    metallicBlue: zxSpectrumColorsDimmed.cyan,
    pastelBlue: zxSpectrumColors.cyan,
    highlightBeige: zxSpectrumColors.yellow,
    lightBeige: zxSpectrumColorsDimmed.yellow,
    midRed: zxSpectrumColors.red,
    redShadow: zxSpectrumColorsDimmed.red,
    lightGrey: zxSpectrumColors.white,
  },
);

/**
 * Maps some of the BlockStack palette to Spectrum equivalents.
 * This gives the colour clash simulation effect an easier target to aim for.
 *
 * Created on demand - the texture is GPU-resident, so callers should cache
 * the result rather than rebuild it.
 */
export const blockstackToSpectrumLut = (): Texture =>
  sparseLut(blockstackPaletteToSpectrumMapping);
