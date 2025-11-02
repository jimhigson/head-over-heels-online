import type { Texture } from "pixi.js";

import { Filter, GlProgram } from "pixi.js";

import type { PaletteSwaps } from "./lutTexture/createPaletteSwopLut";

import { vertex } from "./defaults";
import { createPaletteSwopLut } from "./lutTexture/createPaletteSwopLut";
import fragment from "./paletteSwap.frag";

// Cache for PaletteSwapFilter instances
const filterCache = new Map<string, PaletteSwapFilter>();

/**
 * Filter to emulate palette swopping from the indexed graphics days
 */
class PaletteSwapFilter extends Filter {
  #lutTexture: Texture;

  /**
   * @param options - Options for the PaletteSwapFilter constructor.
   */
  constructor(swops: PaletteSwaps) {
    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "palette-swop-filter",
    });

    const lutTexture = createPaletteSwopLut(swops);

    super({
      //gpuProgram, the (more modern!) gpuProgram has been removed for the simple palette swop effects in head-over-heels-online
      // - this could be ported back later if support is good enough, but our demands are extremely low and glsl is fine
      glProgram,
      resources: {
        colorReplaceUniforms: {},
        uLut: lutTexture.source,
      },
    });

    this.#lutTexture = lutTexture;
  }

  get lut(): Texture {
    return this.#lutTexture;
  }

  /**
   * Destroys this filter and its LUT texture
   * @param options - @see Filter.destroy
   */
  destroy(options?: boolean): void {
    // Destroy our LUT texture to free GPU memory
    this.#lutTexture?.destroy(true);
    // free main memory:
    this.#lutTexture = null as unknown as Texture;

    // Call parent destroy
    super.destroy(options);
  }
}

/**
 * Generate a hash key for a PaletteSwaps object
 */
const hashSwops = (swops: PaletteSwaps): string => {
  return Object.entries(swops)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, color]) => `${key}:${color.toHex()}`)
    .join("|");
};

/**
 * Factory function to get or create a cached PaletteSwapFilter
 * This prevents creating duplicate filters for the same palette swaps
 */
export const getPaletteSwapFilter = (
  swops: PaletteSwaps,
): PaletteSwapFilter => {
  const key = hashSwops(swops);

  let filter = filterCache.get(key);
  if (!filter) {
    filter = new PaletteSwapFilter(swops);
    filterCache.set(key, filter);
  }

  return filter;
};
