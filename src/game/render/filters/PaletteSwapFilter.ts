import type { Color } from "pixi.js";
import { Filter, GlProgram } from "pixi.js";
import { vertex } from "./defaults";
import fragment from "./paletteSwap.frag?raw";
import type { SpritesheetPaletteColourName } from "gfx/spritesheetPalette";
import { spritesheetPalette } from "gfx/spritesheetPalette";

/** Options for the PaletteSwapFilter constructor. */
export type PaletteSwaps = Partial<Record<SpritesheetPaletteColourName, Color>>;

/**
 * Filter to emulate palette swopping from the indexed graphics days
 */
export class PaletteSwapFilter extends Filter {
  /**
   * @param options - Options for the PaletteSwapFilter constructor.
   */
  constructor(swops: PaletteSwaps) {
    const swopCount = Object.keys(swops).length;

    const glProgram = GlProgram.from({
      vertex,
      fragment: fragment.replace(/\$\{SWOP_COUNT\}/g, swopCount.toFixed(0)),
      name: "palette-swop-filter",
    });

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
      },
    });

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
}
