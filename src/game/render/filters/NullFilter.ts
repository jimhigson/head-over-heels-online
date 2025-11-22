import { defaultFilterVert, Filter, GlProgram } from "pixi.js";

import fragment from "./null.frag";

const glProgram = GlProgram.from({
  vertex: defaultFilterVert,
  fragment,
  name: "null-filter",
});

/* filter that does nothing. Purely to work around pixi.js sometimes not rendering cached textures correctly,
   and having a filter forcing that to work */
export class NullFilter extends Filter {
  constructor() {
    super({
      glProgram,
      resources: {},
    });
  }
}
