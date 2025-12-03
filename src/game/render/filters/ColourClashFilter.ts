import {
  type ColorSource,
  defaultFilterVert,
  Filter,
  GlProgram,
  Texture,
} from "pixi.js";

import fragment from "./colourClash.frag";

const glProgram = GlProgram.from({
  vertex: defaultFilterVert,
  fragment,
  name: "colour-clash-filter",
});

/**
 * Filter to use a colour from the backbuffer for non-black pixels
 */
export class ColourClashFilter extends Filter {
  constructor(colour: ColorSource) {
    super({
      glProgram,
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
