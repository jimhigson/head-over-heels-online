import { defaultFilterVert, Filter, GlProgram } from "pixi.js";

import hardenChannelsFrag from "./hardenChannels.frag";

/**
 * Snaps every channel (RGB and alpha) to binary 0 or 1: the raw shadowMask
 * shapes become crisp on/off masks. Applied only to the shadowMask frames,
 * baked in isolation, so it never sees the coloured art it would otherwise
 * crush.
 */
export const hardenChannelsFilter = new Filter({
  glProgram: GlProgram.from({
    vertex: defaultFilterVert,
    fragment: hardenChannelsFrag,
    name: "shadow-mask-harden-channels",
  }),
  // baked off-screen onto the spritesheet, never on the screen target, so it
  // must not be clipped to the screen viewport (which would crop the sheet):
  clipToViewport: false,
});
