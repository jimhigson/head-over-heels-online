import {
  type Color,
  defaultFilterVert,
  Filter,
  type FilterSystem,
  GlProgram,
  type RenderTexture,
  type Texture,
} from "pixi.js";

import {
  type BlockstackPaletteColourName,
  paletteBlockstack,
} from "../../../sprites/palette/spritesheetPalette";
import { selectGameEngineUpscale } from "../../../store/slices/upscale/upscaleSlice";
import { store } from "../../../store/store";
import { transformObject } from "../../../utils/transformObject";
import fragment from "./outline.frag";

export type OutlineFilterOptions = {
  color: Color;
  width?: number;
  /**
   * pass false when the filtered container is baked off-screen (eg into a text
   * cache texture) so the filter is not clipped to the screen viewport. Defaults
   * to pixi's default (true), which is correct for filters applied on-screen.
   */
  clipToViewport?: boolean;
};

/** Current global upscale value for all outline filters */
let currentUpscale = selectGameEngineUpscale(store.getState());

// Subscribe to store changes to update currentUpscale
store.subscribe(() => {
  currentUpscale = selectGameEngineUpscale(store.getState());
});

export class OutlineFilter extends Filter {
  #outlineWidth?: number;

  constructor({ color, width, clipToViewport = true }: OutlineFilterOptions) {
    const upscale = width ?? currentUpscale;

    super({
      glProgram: GlProgram.from({
        vertex: defaultFilterVert,
        fragment,
        name: "outline-filter",
      }),
      // the upscale (and so the outline width) can be fractional, and pixi
      // truncates padding to an integer - ceil so the outline always has
      // enough clearance:
      padding: Math.ceil(upscale),
      clipToViewport,
      // run the filter pass at the render target's resolution (pixi's default
      // is a fixed 1): on-screen targets are resolution 1 so this changes
      // nothing there, but baking over a cleanEdge-upscaled sheet keeps its
      // full backing store instead of flattening back to 1x. The outline
      // width is scaled to match in apply():
      resolution: "inherit",
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

    this.#outlineWidth = width;

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

  /**
   * override the outline width (in the filter's rendered pixels); undefined
   * reverts to following the game's global upscale
   */
  set width(width: number | undefined) {
    this.#outlineWidth = width;
    // we always need to expand enough to contain one outline (ceil: widths
    // can be fractional and pixi truncates padding to an integer):
    this.padding = Math.ceil(width ?? currentUpscale);
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
    const outlineWidth = this.#outlineWidth ?? currentUpscale;

    if (this.#outlineWidth === undefined) {
      // no explicit width: follow the global upscale, which can change at
      // runtime, so keep padding matched to it each frame (an explicit width
      // owns its own padding, set in the width setter). Ceil: the upscale can
      // be fractional and pixi truncates padding to an integer:
      this.padding = Math.ceil(outlineWidth);
    }

    // the shader's width is in texels of the filter input texture; the pass
    // runs at the input's resolution ("inherit" above), so scale to keep the
    // outline's logical thickness when baking over an upscaled sheet:
    uniforms.uOutlineWidth[0] = outlineWidth * input.source.resolution;

    super.apply(filterSystem, input, output, clearMode);
  }
}

type PrebakedFilterName = "black1pxFilter" | BlockstackPaletteColourName;

/** Pre-baked outline filters for all spritesheet palette colors */
export const outlineFilters: Record<PrebakedFilterName, OutlineFilter> = {
  ...transformObject(paletteBlockstack, ([colorName, color]) => [
    colorName,
    new OutlineFilter({ color }),
  ]),
  /**
   * Special black outline filter with 1px width. For example, for
   * pre-rasterised sprites that need a consistent outline
   */
  black1pxFilter: new OutlineFilter({
    color: paletteBlockstack.pureBlack,
    width: 1,
  }),
};
