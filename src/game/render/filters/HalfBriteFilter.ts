import { Filter, GlProgram } from "pixi.js";

import { vertex } from "./defaults";
import fragment from "./halfBrite.frag";

/**
 * Filter to put graphics back to how they looked on the spectrum!
 */
export class HalfBriteFilter extends Filter {
  constructor() {
    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "halfbrite-filter",
    });

    super({
      //gpuProgram, the (more modern!) gpuProgram has been removed for the simple palette swap effects in head-over-heels-online
      // - this could be ported back later if support is good enough, but our demands are extremely low and glsl is fine
      glProgram,
      resources: {},
    });
  }
}
