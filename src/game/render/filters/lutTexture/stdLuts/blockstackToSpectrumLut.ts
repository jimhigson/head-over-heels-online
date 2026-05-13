import { type Texture } from "pixi.js";

import { blockStackSpritesheetMeta } from "../../../../../../gfx/spritesheetMeta/blockStackSpritesheetMeta";
import { sparseLut } from "../sparseLut";
import { resolveZxSpectrumMapping } from "./resolveZxSpectrumMapping";

export const blockstackPaletteToSpectrumMapping = resolveZxSpectrumMapping(
  blockStackSpritesheetMeta,
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
