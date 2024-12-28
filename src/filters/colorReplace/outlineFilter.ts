import type { Color } from "pixi.js";
import { Filter, GlProgram } from "pixi.js";
import { vertex } from "../defaults";
import fragment from "./outline.frag?raw";

export class OutlineFilter extends Filter {
  /**
   * @param options - Options for the OutlineFilter constructor.
   */
  constructor(
    outlineColor: Color,
    private upscale: number,
  ) {
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
    //this.resolution = 1 / upscale;
    //this.padding = 1;
  }

  /*setUpscale(upscale: number) {
    
  }*/
}
