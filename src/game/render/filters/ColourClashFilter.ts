import { defaultFilterVert, Filter, GlProgram, Texture } from "pixi.js";

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
  constructor() {
    super({
      glProgram,
      resources: {
        colorReplaceUniforms: {},
        uBackTexture: Texture.EMPTY,
      },
      blendRequired: true,
    });
  }
}

// singleton instance since this has no params
export const colourClashFilter = new ColourClashFilter();
