import type { ColorSource } from "pixi.js";
import { Color, Filter, GlProgram } from "pixi.js";
import { vertex } from "../defaults";
import fragment from "./revertColourise.frag?raw";
import { spritesheetPalette } from "@/sprites/samplePalette";

const sourceBlacks: [Color, Color] = [
  spritesheetPalette().pureBlack,
  spritesheetPalette().lightBlack,
];

/**
 * Filter to put graphics back to how they looked on the spectrum!
 */
export class RevertColouriseFilter extends Filter {
  public uniforms: {
    uSourceBlacks: Float32Array;
    uTargetColor: Float32Array;
  };

  /**
   * @param options - Options for the RevertColouriseFilter constructor.
   */
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
          uSourceBlacks: {
            value: new Float32Array(6),
            type: "vec3<f32>",
            size: 6,
          },
          uTargetColor: { value: new Float32Array(3), type: "vec3<f32>" },
        },
      },
    });

    this.uniforms = this.resources.colorReplaceUniforms.uniforms;

    const [r1, g1, b1] = sourceBlacks[0].toArray();

    this.uniforms.uSourceBlacks[0] = r1;
    this.uniforms.uSourceBlacks[1] = g1;
    this.uniforms.uSourceBlacks[2] = b1;

    const [r2, g2, b2] = sourceBlacks[1].toArray();
    this.uniforms.uSourceBlacks[3] = r2;
    this.uniforms.uSourceBlacks[4] = g2;
    this.uniforms.uSourceBlacks[5] = b2;

    this.targetColor = targetColor;
  }

  set targetColor(value: ColorSource) {
    const [r, g, b] = new Color(value).toArray();
    this.uniforms.uTargetColor[0] = r;
    this.uniforms.uTargetColor[1] = g;
    this.uniforms.uTargetColor[2] = b;
  }
}
