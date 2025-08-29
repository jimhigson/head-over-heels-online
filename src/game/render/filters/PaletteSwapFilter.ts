import type { SpritesheetPaletteColourName } from "gfx/spritesheetPalette";
import type { Color } from "pixi.js";

import { spritesheetPalette } from "gfx/spritesheetPalette";
import { Filter, GlProgram, Texture } from "pixi.js";

import { objectEntriesIter } from "../../../utils/entries";
import { vertex } from "./defaults";
import fragment from "./paletteSwap.frag?raw";

export type PaletteSwaps = Partial<Record<SpritesheetPaletteColourName, Color>>;

const lutSize = 256;
const smallPrime = 31;

// Cache for PaletteSwapFilter instances
const filterCache = new Map<string, PaletteSwapFilter>();

function hashColor(color: Color): number {
  // Match the shader's rounding behavior
  const ri = Math.floor(color.red * 255 + 0.5);
  const gi = Math.floor(color.green * 255 + 0.5);
  const bi = Math.floor(color.blue * 255 + 0.5);

  return (ri + gi * smallPrime + bi * smallPrime * smallPrime) % lutSize;
}

function createLut(swops: PaletteSwaps): Texture {
  // Create RGBA texture data (4 bytes per pixel)
  const data = new Float32Array(lutSize * 4);

  for (const [original, target] of objectEntriesIter(swops)) {
    const originalColor = spritesheetPalette[original];

    const index = hashColor(originalColor);

    const existingAlpha = data[index * 4 + 3];
    if (existingAlpha > 0.5) {
      throw new Error(
        "LUT collision - mess with the hash function or lut size until this goes away",
      );
    }

    // Set the replacement color in the LUT
    data[index * 4 + 0] = target.red; // R
    data[index * 4 + 1] = target.green; // G
    data[index * 4 + 2] = target.blue; // B
    data[index * 4 + 3] = 1; // alpha of fully opaque signals an entry in the lut
  }

  // Convert Float32Array to Uint8Array for standard RGBA texture
  const uint8Data = new Uint8Array(lutSize * 4);
  for (let i = 0; i < lutSize * 4; i++) {
    uint8Data[i] = Math.floor(data[i] * 255);
  }

  // Create texture from the uint8 data using BufferSourceOptions
  const texture = Texture.from({
    resource: uint8Data,
    width: lutSize,
    height: 1,
    scaleMode: "nearest",
    antialias: false,
  });

  return texture;
}

/**
 * Filter to emulate palette swopping from the indexed graphics days
 */
class PaletteSwapFilter extends Filter {
  #lutTexture: Texture;

  /**
   * @param options - Options for the PaletteSwapFilter constructor.
   */
  constructor(swops: PaletteSwaps) {
    const swopCount = Object.keys(swops).length;

    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "palette-swop-filter",
    });

    const lutTexture = createLut(swops);

    super({
      //gpuProgram, the (more modern!) gpuProgram has been removed for the simple palette swop effects in head-over-heels-online
      // - this could be ported back later if support is good enough, but our demands are extremely low and glsl is fine
      glProgram,
      resources: {
        colorReplaceUniforms: {
          uOriginal: {
            value: new Float32Array(3 * swopCount),
            type: "vec3<f32>",
            size: swopCount,
          },
          uReplacement: {
            value: new Float32Array(3 * swopCount),
            type: "vec3<f32>",
            size: swopCount,
          },
        },
        uLut: lutTexture.source,
      },
    });

    this.#lutTexture = lutTexture;

    const uniforms = this.resources.colorReplaceUniforms.uniforms as {
      uOriginal: Float32Array;
      uReplacement: Float32Array;
    };

    (Object.entries(swops) as [SpritesheetPaletteColourName, Color][]).forEach(
      ([original, target], i) => {
        spritesheetPalette[original].toArray().forEach((c, j) => {
          uniforms.uOriginal[i * 3 + j] = c;
        });

        target.toArray().forEach((c, j) => {
          uniforms.uReplacement[i * 3 + j] = c;
        });
      },
    );
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
