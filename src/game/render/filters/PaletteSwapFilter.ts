import type { SpritesheetPaletteColourName } from "gfx/spritesheetPalette";
import type { Color } from "pixi.js";

import { spritesheetPalette } from "gfx/spritesheetPalette";
import { Filter, GlProgram, Texture } from "pixi.js";

import {
  blockEncodeRgbBitDepth,
  getBlockNeighborhood,
} from "../../../utils/colour/blockEncode";
import { amigaHalfBriteBrightness } from "../../../utils/colour/halfBrite";
import { objectEntriesIter } from "../../../utils/entries";
import { vertex } from "./defaults";
import fragment from "./paletteSwap.frag?raw";

export type PaletteSwaps = Partial<Record<SpritesheetPaletteColourName, Color>>;

// Using block encoding with 6 bits per channel, we need 512x512 texture
// 8x8 blocks of 64x64 pixels each
const lutW = (2 ** blockEncodeRgbBitDepth) ** (3 / 2); // 64^1.5 = 512
const lutSize = lutW * lutW;

/**
 * for every colour that we put in the lut, also add the halfbrite version
 */
const brightnessLevels = [1, amigaHalfBriteBrightness];

// Cache for PaletteSwapFilter instances
const filterCache = new Map<string, PaletteSwapFilter>();

const createLut = (swops: PaletteSwaps): Texture => {
  // Create RGBA texture data (4 bytes per pixel)
  const data = new Uint8Array(lutSize * 4);

  // we also put the shadow-ed version of the colour in the LUT:
  for (const bright of brightnessLevels) {
    for (const [original, target] of objectEntriesIter(swops)) {
      const originalColor = spritesheetPalette[original];

      // Write to a neighborhood of positions to handle slight color variations
      // (e.g., from anti-aliasing, compression artifacts, or floating point errors)
      for (const { x, y, distance } of getBlockNeighborhood(
        originalColor.red * bright,
        originalColor.green * bright,
        originalColor.blue * bright,
        2, // neighbourhood radius - describes a cube in 6-bit color space
      )) {
        // Calculate linear index in the texture
        const index = y * lutW + x;

        const existingAlpha = data[index * 4 + 3];

        // Alpha channel stores closeness (0 = far/unwritten, 255 = exact match)
        // For radius 1, max distance is sqrt(3) ≈ 1.732
        // Scale: distance 0 -> alpha 255, distance 1.732 -> alpha 1
        const closenessAlpha = Math.max(
          1,
          Math.floor(255 - (distance / 1.732) * 254),
        );

        // Only overwrite if:
        // - The position is empty (alpha = 0, unwritten), OR
        // - This distance is closer than what's already there (higher alpha)
        if (existingAlpha === 0 || closenessAlpha > existingAlpha) {
          // Set the replacement color in the LUT
          data[index * 4 + 0] = Math.floor(target.red * bright * 255);
          data[index * 4 + 1] = Math.floor(target.green * bright * 255);
          data[index * 4 + 2] = Math.floor(target.blue * bright * 255);
          data[index * 4 + 3] = closenessAlpha; // Store closeness in alpha
        }
      }
    }
  }

  // Final pass: normalize alpha to 1 where it's non-zero (for better visualization)
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 0) {
      data[i] = 255;
    }
  }

  // Create texture from the uint8 data using BufferSourceOptions
  const texture = Texture.from({
    resource: data,
    width: lutW,
    height: lutW,
    scaleMode: "nearest",
    antialias: false,
  });

  return texture;
};

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
