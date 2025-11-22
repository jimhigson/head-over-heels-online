import { Color, type Texture } from "pixi.js";

import { sparseLut } from "../sparseLut";

/**
 * Maps some of the palette's colours to their closest on the Spectrum.
 * This gives the colour clash simulation effect an easier target to aim for
 */
export const spectrumLut: Texture = sparseLut({
  // although moss is our green, it isn't actually *that* green- help the shader to find it:
  moss: new Color(0x00ff00),
  pink: new Color(0xff00ff),
  metallicBlue: new Color(0x008888),
  pastelBlue: new Color(0x00ffff),
  highlightBeige: new Color(0xffff00),
  lightBeige: new Color(0x888800),
  midRed: new Color(0xff0000),
  redShadow: new Color(0x880000),
  lightGrey: new Color(0xffffff),
  // don't do this - it makes the mid-grey less likely to be mixed to dimmed
  // white when mixed with other colours
  //midGrey: new Color(0x888888),
});
