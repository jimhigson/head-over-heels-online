import { defaultFilterVert, Filter, GlProgram } from "pixi.js";

import binariseAlphaFrag from "./binariseAlpha.frag";

/**
 * Snaps any non-zero alpha to fully opaque, leaving RGB untouched: the binary
 * (ZX-style) rendering of alpha-encoded shadow strength. Applied only to the
 * shadow frames, baked in isolation, so every other frame's alpha is never
 * touched.
 */
export const binariseAlphaFilter = new Filter({
  glProgram: GlProgram.from({
    vertex: defaultFilterVert,
    fragment: binariseAlphaFrag,
    name: "shadow-binarise-alpha",
  }),
  // baked off-screen onto the spritesheet, never on the screen target, so it
  // must not be clipped to the screen viewport (which would crop the sheet):
  clipToViewport: false,
});
