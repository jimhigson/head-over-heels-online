import { type Texture } from "pixi.js";

import { toppySpritesheetMeta } from "../../../../../../gfx/spritesheetMeta/toppySpritesheetMeta";
import { sparseLut } from "../sparseLut";
import { blockstackPaletteToSpectrumMapping } from "./blockstackToSpectrumLut";
import { resolveZxSpectrumMapping } from "./resolveZxSpectrumMapping";

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
      // toppy's spritesheet still has blockstack walls and other sprites,
      // so also spread those colours in at lower precedence
      ...blockstackPaletteToSpectrumMapping,
      ...resolveZxSpectrumMapping(toppySpritesheetMeta),
    ]),
  );
