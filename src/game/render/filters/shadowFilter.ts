import { defaultFilterVert, Filter, GlProgram } from "pixi.js";

import fragment from "./shadowFilter.frag";

const glProgram = GlProgram.from({
  vertex: defaultFilterVert,
  fragment,
  name: "palletised-shadow-filter",
});

/**
 * instead of AlphaFilter - since we need that anyway, might as well have a slightly bespoke filter
 */
class ShadowFilter extends Filter {
  constructor() {
    super({
      glProgram,
      resources: {},
    });
  }
}

// singleton instance since this doesn't have any options:
export const shadowFilter = new ShadowFilter();
