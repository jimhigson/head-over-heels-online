import { type Texture } from "pixi.js";

import {
  zxSpectrumColors,
  zxSpectrumColorsDimmed,
} from "../../../../../originalGame";
import { paletteBlockstack } from "../../../../../sprites/palette/spritesheetPalette";
import { resolveSwops } from "../../../../../utils/palette/palette";
import { sparseLut } from "../sparseLut";

/**
 * Maps some of the BlockStack palette to Spectrum equivalents.
 * This gives the colour clash simulation effect an easier target to aim for
 */
export const blockstackToSpectrumLut: Texture = sparseLut(
  resolveSwops(paletteBlockstack, {
    // although moss is our green, it isn't actually *that* green- help the shader to find it:
    moss: zxSpectrumColors.green,
    pink: zxSpectrumColors.magenta,
    metallicBlue: zxSpectrumColorsDimmed.cyan,
    pastelBlue: zxSpectrumColors.cyan,
    highlightBeige: zxSpectrumColors.yellow,
    lightBeige: zxSpectrumColorsDimmed.yellow,
    midRed: zxSpectrumColors.red,
    redShadow: zxSpectrumColorsDimmed.red,
    lightGrey: zxSpectrumColors.white,
    // don't do this - it makes the mid-grey less likely to be mixed to dimmed
    // white when mixed with other colours
    //midGrey: new Color(0x888888),
  }),
);
