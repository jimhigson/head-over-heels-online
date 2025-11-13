import { Filter, GlProgram } from "pixi.js";
// import { GpuProgram } from "pixi.js";

import { vertex } from "./defaults";
import fragment from "./shadowFilter.frag";

class ShadowFilter extends Filter {
  constructor() {
    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "palletised-shadow-filter",
    });

    super({
      glProgram,
      resources: {},
      blendRequired: true,
    });
  }
}

// singleton instance since this doesn't have any options:
export const shadowFilter = new ShadowFilter();
