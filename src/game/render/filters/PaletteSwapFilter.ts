import type { Color } from "pixi.js";

import { defaultFilterVert, Filter, GlProgram, Texture } from "pixi.js";

import { sparseLut } from "./lutTexture/sparseLut";
import { voronoiLut } from "./lutTexture/voronoiLut";
import fragment from "./paletteSwap.frag";

const glProgram = GlProgram.from({
  vertex: defaultFilterVert,
  fragment,
  name: "palette-swop-filter1",
});

export type LutType = "sparse" | "voronoi";

export type PaletteSwopSpec = {
  /**
   * the resolved source-colour → target-colour mapping to apply
   */
  swops: Map<Color, Color>;
  lutType: LutType;
};

/**
 * Filter to emulate palette swopping from the indexed graphics days
 */
export class PaletteSwapFilter extends Filter {
  #lutTexture: Texture;

  /**
   * @param options - Options for the PaletteSwapFilter constructor.
   */
  constructor(
    { swops, lutType }: PaletteSwopSpec,
    /**
     * where to mask the effect - white is on, black is off -
     * default to all white to apply everywhere
     */
    private mask: Texture = Texture.WHITE,
  ) {
    const lutTexture =
      lutType === "voronoi" ? voronoiLut(swops) : sparseLut(swops);

    super({
      glProgram,
      resources: {
        colorReplaceUniforms: {},
        uLut: lutTexture.source,
        uMask: mask.source,
      },
    });

    this.#lutTexture = lutTexture;
  }

  /**
   * Destroys this filter and its LUT texture
   * @param destroyOptions - @see Filter.destroy
   */
  destroy(
    /** true to destroy all */
    destroyOptions?:
      | {
          destroyPrograms?: boolean;
          destroyLutTexture?: boolean;
          destroyMask?: boolean;
        }
      | boolean,
  ): void {
    const destroyPrograms =
      destroyOptions === true ||
      (typeof destroyOptions === "object" && destroyOptions.destroyPrograms);

    const destroyLutTexture =
      destroyOptions === true ||
      (typeof destroyOptions === "object" && destroyOptions.destroyLutTexture);

    const destroyMask =
      (this.lutTexture !== Texture.WHITE && destroyOptions === true) ||
      (typeof destroyOptions === "object" && destroyOptions.destroyMask);

    // Destroy our LUT texture to free GPU memory
    if (destroyLutTexture) {
      this.#lutTexture?.destroy(true);
    }
    // free our reference regardless of if the texture was destroyed
    this.#lutTexture = null as unknown as Texture;

    if (destroyMask) {
      this.mask?.destroy(true);
    }

    // Call parent destroy
    super.destroy(destroyPrograms);
  }

  /** probably just for debugging */
  get lutTexture(): Texture {
    return this.#lutTexture;
  }
}
