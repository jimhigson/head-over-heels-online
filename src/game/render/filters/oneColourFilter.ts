import type { Color } from "pixi.js";

import { Filter, GlProgram } from "pixi.js";

import { vertex } from "./defaults";
import fragment from "./oneColour.frag";

type Uniforms = {
  uColour: Float32Array;
};

/* very simple filter - render non-transparent pixels as a single colour */
export class OneColourFilter extends Filter {
  constructor(colour: Color) {
    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "oneColour-filter",
    });

    super({
      glProgram,
      resources: {
        colorReplaceUniforms: {
          uColour: {
            value: new Float32Array(3),
            type: "vec3<f32>",
          },
        },
      },
    });

    const uniforms = this.resources.colorReplaceUniforms.uniforms as Uniforms;

    const [r, g, b] = colour.toArray();

    uniforms.uColour[0] = r;
    uniforms.uColour[1] = g;
    uniforms.uColour[2] = b;
  }
}
