import { defaultFilterVert, Filter, GlProgram } from "pixi.js";

import fragment from "./halfBrite.frag";

const glProgram = GlProgram.from({
  vertex: defaultFilterVert,
  fragment,
  name: "halfbrite-filter",
});

/**
 * Filter to put graphics back to how they looked on the spectrum!
 */
export class HalfBriteFilter extends Filter {
  constructor() {
    super({
      //gpuProgram, the (more modern!) gpuProgram has been removed for the simple palette swap effects in head-over-heels-online
      // - this could be ported back later if support is good enough, but our demands are extremely low and glsl is fine
      glProgram,
      resources: {},
    });
  }
}
