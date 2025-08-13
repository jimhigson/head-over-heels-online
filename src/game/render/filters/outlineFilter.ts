import type { Color, FilterSystem, RenderTexture, Texture } from "pixi.js";
import { Filter, GlProgram } from "pixi.js";
import { vertex } from "./defaults";
import fragment from "./outline.frag?raw";
import type { SpritesheetPaletteColourName } from "../../../../gfx/spritesheetPalette";
import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { store } from "../../../store/store";
import { selectGameEngineUpscale } from "../../../store/slices/upscale/upscaleSlice";
import { transformObject } from "../../../utils/entries";

export type OutlineFilterOptions = {
  color: Color;
  width?: number;
};

/** Current global upscale value for all outline filters */
let currentUpscale = selectGameEngineUpscale(store.getState());

// Subscribe to store changes to update currentUpscale
store.subscribe(() => {
  currentUpscale = selectGameEngineUpscale(store.getState());
});

export class OutlineFilter extends Filter {
  private outlineWidth?: number;

  constructor({ color, width }: OutlineFilterOptions) {
    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "outline-filter",
    });

    const upscale = width ?? currentUpscale;

    super({
      glProgram,
      padding: upscale,
      resources: {
        colorReplaceUniforms: {
          uOutline: {
            value: new Float32Array(3),
            type: "vec3<f32>",
          },
          uOutlineWidth: {
            value: new Float32Array(1),
            type: "f32",
          },
        },
      },
    });

    this.outlineWidth = width;

    const uniforms = this.resources.colorReplaceUniforms.uniforms as {
      uOutline: Float32Array;
      uOutlineWidth: Float32Array;
    };

    const [r, g, b] = color.toArray();

    uniforms.uOutline[0] = r;
    uniforms.uOutline[1] = g;
    uniforms.uOutline[2] = b;
    // uOutlineWidth is set in apply() method
  }

  override apply(
    filterSystem: FilterSystem,
    input: Texture,
    output: RenderTexture,
    clearMode: boolean,
  ): void {
    // Update uniforms and padding from the global upscale value before rendering
    const uniforms = this.resources.colorReplaceUniforms.uniforms as {
      uOutline: Float32Array;
      uOutlineWidth: Float32Array;
    };

    // Use custom width if provided, otherwise use standard behavior
    const outlineWidth = this.outlineWidth ?? currentUpscale;

    this.padding = outlineWidth;
    uniforms.uOutlineWidth[0] = outlineWidth;

    super.apply(filterSystem, input, output, clearMode);
  }
}

type PrebakedFilterName = SpritesheetPaletteColourName | "black1pxFilter";

/** Pre-baked outline filters for all spritesheet palette colors */
export const outlineFilters: Record<PrebakedFilterName, OutlineFilter> = {
  ...transformObject(spritesheetPalette, ([colorName, color]) => [
    colorName,
    new OutlineFilter({ color }),
  ]),
  /**
   * Special black outline filter with 1px width. For example, for
   * pre-rasterised sprites that need a consistent outline
   */
  black1pxFilter: new OutlineFilter({
    color: spritesheetPalette.pureBlack,
    width: 1,
  }),
};
