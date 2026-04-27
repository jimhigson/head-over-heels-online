import { type Texture } from "pixi.js";

import {
  zxSpectrumColors,
  zxSpectrumColorsDimmed,
} from "../../../../../originalGame";
import { paletteToppy } from "../../../../../sprites/palette/spritesheetPalette";
import { resolveSwops } from "../../../../../utils/palette/palette";
import { sparseLut } from "../sparseLut";
import { blockstackPaletteToSpectrumMapping } from "./blockstackToSpectrumLut";

/**
 * Maps some of the Toppy palette to Spectrum equivalents.
 * This gives the colour clash simulation effect an easier target to aim for.
 *
 * Created on demand - the texture is GPU-resident, so callers should cache
 * the result rather than rebuild it.
 */
export const toppyToSpectrumLut = (): Texture =>
  sparseLut(
    new Map([
      // for the timebeing, toppy's spritesheet still has the blockstack walls and other sprites,
      // so also spread those colours in, but at a lower precedence than Toppy's own ones
      ...blockstackPaletteToSpectrumMapping,
      ...resolveSwops(paletteToppy, {
        warm1: zxSpectrumColors.white,
        warm2: zxSpectrumColors.yellow,
        warm3: zxSpectrumColorsDimmed.yellow,
        warm4: zxSpectrumColors.red,
        warm5: zxSpectrumColorsDimmed.magenta,
        warm6: zxSpectrumColorsDimmed.red,
        pink1: zxSpectrumColorsDimmed.magenta,
        pink2: zxSpectrumColors.magenta,
        grey1: zxSpectrumColors.white,
        grey2: zxSpectrumColorsDimmed.white,
        cool1: zxSpectrumColors.white,
        cool2: zxSpectrumColors.cyan,
        cool3: zxSpectrumColors.blue,
        cool4: zxSpectrumColorsDimmed.blue,
        bg_grey1: zxSpectrumColors.white,
        bg_grey2: zxSpectrumColorsDimmed.blue,
        bg_blue: zxSpectrumColors.blue,
      }),
    ]),
  );
