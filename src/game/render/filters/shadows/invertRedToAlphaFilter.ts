import { defaultFilterVert, Filter, GlProgram } from "pixi.js";

import invertRedToAlphaFrag from "./preprocessShadowTextures.frag";

/**
 * Converts opaque black-on-white shadow art to alpha-encoded shadow: RGB goes
 * to pure black and the alpha carries the shadow strength (white becomes
 * transparent, black becomes opaque).
 *
 * Applied only to the shadow frames, baked in isolation into their own rects,
 * so no mask is needed - every pixel it sees is a shadow pixel.
 */
export const invertRedToAlphaFilter = new Filter({
  glProgram: GlProgram.from({
    vertex: defaultFilterVert,
    fragment: invertRedToAlphaFrag,
    name: "shadow-invert-red-to-alpha",
  }),
  // baked off-screen onto the spritesheet, never on the screen target, so it
  // must not be clipped to the screen viewport (which would crop the sheet):
  clipToViewport: false,
  // run the filter pass at the bake target's resolution (pixi's default is a
  // fixed 1), so a cleanEdge-upscaled sheet keeps its full backing store
  // instead of being flattened back to 1x:
  resolution: "inherit",
});
