import {
  type ColorSource,
  defaultFilterVert,
  Filter,
  GlProgram,
  Texture,
} from "pixi.js";

import fragment from "./colourClash.frag";

/**
 * Filter to use a colour from the backbuffer for non-black pixels
 */
export class ColourClashFilter extends Filter {
  constructor(colour: ColorSource) {
    super({
      glProgram: GlProgram.from({
        vertex: defaultFilterVert,
        fragment,
        name: "colour-clash-filter",
      }),
      resources: {
        uBackTexture: Texture.EMPTY,
        colourClashUniforms: {
          uTintColour: { value: colour, type: "vec4<f32>" },
        },
      },
      blendRequired: true,
    });
  }
}
