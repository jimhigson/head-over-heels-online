import type { Color } from "pixi.js";
import { Filter, GlProgram } from "pixi.js";
import { vertex } from "./defaults";
import fragment from "./outline.frag?raw";

export type OutlineFilterOptions = {
  outlineColor: Color;
  /**
   * the width of the outline - since the outline is always 1px, it need to (in practice)
   * be bigger when we are upscaled
   */
  upscale: number;
  /**
   * if given true, the resolution of the filter will be dropped to the inverse of the upscale.
   * This only works if the thing being rendered is strictly on the pixel grid.
   */
  lowRes: boolean;
};
export class OutlineFilter extends Filter {
  constructor({ outlineColor, upscale, lowRes }: OutlineFilterOptions) {
    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "outline-filter",
    });

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

    const uniforms = this.resources.colorReplaceUniforms.uniforms as {
      uOutline: Float32Array;
      uOutlineWidth: Int32Array;
    };

    const [r, g, b] = outlineColor.toArray();

    uniforms.uOutline[0] = r;
    uniforms.uOutline[1] = g;
    uniforms.uOutline[2] = b;
    uniforms.uOutlineWidth[0] = upscale;

    // this means easier rendering, in actual unscaled sprite space, but
    // also that the sprite can't smoothly transition by being rendered 'between' pixels
    if (lowRes) {
      this.resolution = 1 / upscale;
      this.padding = upscale;
      uniforms.uOutlineWidth[0] = 1;
    }
  }
}
