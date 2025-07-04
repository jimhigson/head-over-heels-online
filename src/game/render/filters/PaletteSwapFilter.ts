import type { Color } from "pixi.js";
import { Filter, GlProgram, Texture } from "pixi.js";
import { vertex } from "./defaults";
import fragment from "./paletteSwap.frag?raw";
import type { SpritesheetPaletteColourName } from "gfx/spritesheetPalette";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { objectEntriesIter } from "../../../utils/entries";

export type PaletteSwaps = Partial<Record<SpritesheetPaletteColourName, Color>>;

const lutSize = 512;
const smallPrime = 37;

function hashColor(color: Color): number {
  const ri = Math.floor(color.red * 255);
  const gi = Math.floor(color.green * 255);
  const bi = Math.floor(color.blue * 255);

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
  });

  return texture;
}

/**
 * Filter to emulate palette swopping from the indexed graphics days
 */
export class PaletteSwapFilter extends Filter {
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
