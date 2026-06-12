import { type Color, defaultFilterVert, Filter, GlProgram } from "pixi.js";

import fragment from "./twoTone.frag";

type Uniforms = {
  uLight: Float32Array;
  uDark: Float32Array;
};

/**
 * renders non-transparent pixels in one of two colours, by luminance -
 * used to draw reflections in mirrors in the mirror surface's two colours
 */
export class TwoToneFilter extends Filter {
  constructor(light: Color, dark: Color) {
    super({
      glProgram: GlProgram.from({
        vertex: defaultFilterVert,
        fragment,
        name: "twoTone-filter",
      }),
      resources: {
        twoToneUniforms: {
          uLight: {
            value: new Float32Array(3),
            type: "vec3<f32>",
          },
          uDark: {
            value: new Float32Array(3),
            type: "vec3<f32>",
          },
        },
      },
    });

    const uniforms = this.resources.twoToneUniforms.uniforms as Uniforms;

    const [lightR, lightG, lightB] = light.toArray();
    uniforms.uLight[0] = lightR;
    uniforms.uLight[1] = lightG;
    uniforms.uLight[2] = lightB;

    const [darkR, darkG, darkB] = dark.toArray();
    uniforms.uDark[0] = darkR;
    uniforms.uDark[1] = darkG;
    uniforms.uDark[2] = darkB;
  }
}
