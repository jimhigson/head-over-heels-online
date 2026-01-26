import { Color } from "pixi.js";

import { parseHex } from "./parseHex";

/**
 * how dark to make the shadows in range 0..1 to emulate Amiga EHB (lower is darker)
 */
export const amigaHalfBriteBrightness = 0.4;
/**
 * an alternative brightness level for when calculating replacements for placeholder
 * colours that can be used if halfbright looks too dark
 */
export const slightlyBrighterReducedBrightness = 0.5;

export const shadowAliasingBrightness = 0.7;

export const standardBrightnessLevels = [
  1,
  slightlyBrighterReducedBrightness,
  amigaHalfBriteBrightness,
  shadowAliasingBrightness,
];

export const halfbrite = (c: Color, dimFactor = amigaHalfBriteBrightness) => {
  const [r, g, b] = c.toUint8RgbArray();
  const hb = new Color({
    r: r * dimFactor,
    g: g * dimFactor,
    b: b * dimFactor,
  });
  return hb;
};
export const halfbriteHex = (hex: string) => {
  const { r, g, b } = parseHex(hex)!;

  const toHex = (val: number) =>
    Math.floor(val * amigaHalfBriteBrightness)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
