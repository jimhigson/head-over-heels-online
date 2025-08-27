import type { ColorSource } from "pixi.js";

import { Color, Filter, GlProgram } from "pixi.js";

import fragment from "./colourClash.frag?raw";
import { vertex } from "./defaults";

/**
 * Filter to use a colour from the backbuffer for non-black pixels
 */
export class ColourClashFilter extends Filter {
  public uniforms: {
    uTargetColor: Float32Array;
  };

  constructor(targetColor: ColorSource = "white") {
    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "colour-clash-filter",
    });

    super({
      //gpuProgram, the (more modern!) gpuProgram has been removed for the simple palette swap effects in head-over-heels-online
      // - this could be ported back later if support is good enough, but our demands are extremely low and glsl is fine
      glProgram,
      resources: {
        colorReplaceUniforms: {
          uTargetColor: { value: new Float32Array(3), type: "vec3<f32>" },
        },
      },
      blendRequired: true,
    });

    this.uniforms = this.resources.colorReplaceUniforms.uniforms;

    this.targetColor = targetColor;
  }

  set targetColor(value: ColorSource) {
    const [r, g, b] = new Color(value).toArray();
    this.uniforms.uTargetColor[0] = r;
    this.uniforms.uTargetColor[1] = g;
    this.uniforms.uTargetColor[2] = b;
  }
}
