import { Color, type Texture } from "pixi.js";

import {
  zxSpectrumColors,
  zxSpectrumColorsDimmed,
} from "../../../../../originalGame";
import { voronoiLut } from "../voronoiLut";

// must match the shader's perceptual weights in fragFns/luminance.glsl
const luminance = (c: Color): number =>
  c.red * 0.3 + c.green * 0.6 + c.blue * 0.1;

const greyAt01 = (lum01: number): Color => {
  const byte = Math.round(lum01 * 255)
    .toString(16)
    .padStart(2, "0");
  return new Color(`#${byte}${byte}${byte}`);
};

/**
 * Maps grey-axis colours back to ZX Spectrum colours by luminance match.
 * this creates extra colours when teleporting in spectrum mode, since the lut
 * is looked up in after darkening for the fade circle effect
 */
export const spectrumLumLut = (): Texture =>
  voronoiLut(
    new Map(
      [
        ...Object.values(zxSpectrumColors),
        ...Object.values(zxSpectrumColorsDimmed),
      ].map((spectrumColour) => [
        greyAt01(luminance(spectrumColour)),
        spectrumColour,
      ]),
    ),
  );
