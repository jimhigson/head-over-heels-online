import type { ColorSource } from "pixi.js";

import { Color, Filter, GlProgram } from "pixi.js";

import { vertex } from "./defaults";
import fragment from "./revertColourise.frag";

/**
 * Filter to put graphics back to how they looked on the spectrum!
 */
export class RevertColouriseFilter extends Filter {
  public uniforms: {
    uTargetColor: Float32Array;
  };

  constructor(targetColor: ColorSource = "white") {
    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "revert-colourise-filter",
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
