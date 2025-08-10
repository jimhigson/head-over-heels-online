import type { Color, FilterSystem, RenderTexture, Texture } from "pixi.js";
import { Filter, GlProgram } from "pixi.js";
import { vertex } from "./defaults";
import fragment from "./outline.frag?raw";
import type { SpritesheetPaletteColourName } from "../../../../gfx/spritesheetPalette";
import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { store } from "../../../store/store";
import { selectGameEngineUpscale } from "../../../store/slices/upscale/upscaleSlice";
import { transformObject } from "../../../utils/entries";

/** Current global upscale value for all outline filters */
let currentUpscale = selectGameEngineUpscale(store.getState());

// Subscribe to store changes to update currentUpscale
store.subscribe(() => {
  currentUpscale = selectGameEngineUpscale(store.getState());
});

export class OutlineFilter extends Filter {
  constructor(outlineColor: Color) {
    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "outline-filter",
    });

    super({
      glProgram,
      padding: currentUpscale,
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

    const uniforms = this.resources.colorReplaceUniforms.uniforms as {
      uOutline: Float32Array;
      uOutlineWidth: Float32Array;
    };

    const [r, g, b] = outlineColor.toArray();

    uniforms.uOutline[0] = r;
    uniforms.uOutline[1] = g;
    uniforms.uOutline[2] = b;
    uniforms.uOutlineWidth[0] = currentUpscale;
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

    this.padding = currentUpscale;
    uniforms.uOutlineWidth[0] = currentUpscale;

    super.apply(filterSystem, input, output, clearMode);
  }
}

/** Pre-baked outline filters for all spritesheet palette colors */
export const outlineFilters: Record<
  SpritesheetPaletteColourName,
  OutlineFilter
> = transformObject(spritesheetPalette, ([colorName, color]) => [
  colorName,
  new OutlineFilter(color),
]);
