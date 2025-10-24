import { Filter, GlProgram } from "pixi.js";

import { vertex } from "./defaults";
import fragment from "./null.frag";

/* filter that does nothing. Purely to work around pixi.js sometimes not rendering cached textures correctly,
   and having a filter forcing that to work */
export class NullFilter extends Filter {
  constructor() {
    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "null-filter",
    });

    super({
      glProgram,
      resources: {},
    });
  }
}
