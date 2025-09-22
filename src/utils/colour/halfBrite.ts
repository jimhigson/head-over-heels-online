import { Color } from "pixi.js";

/**
 * how dark to make the shadows in range 0..1 to emulate Amiga EHB (lower is darker)
 */
export const amigaHalfBriteBrightness = 0.4;

export const zxSpectrumDimmed = (c: Color) => {
  const [r, g, b] = c.toUint8RgbArray();
  // 0.5 seems a bit too dim, 0.75 seems to match the original hardware better
  const hb = new Color({ r: r * 0.75, g: g * 0.75, b: b * 0.75 });
  return hb;
};
export const halfbrite = (c: Color, dimFactor = amigaHalfBriteBrightness) => {
  const [r, g, b] = c.toUint8RgbArray();
  const hb = new Color({
    r: r * dimFactor,
    g: g * dimFactor,
    b: b * dimFactor,
  });
  return hb;
};
export function halfbriteHex(hex: string) {
  // Remove the hash (#) if it exists
  hex = hex.replace(/^#/, "");

  // Parse the RGB values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Halve the brightness of each channel
  r = Math.floor(r * amigaHalfBriteBrightness);
  g = Math.floor(g * amigaHalfBriteBrightness);
  b = Math.floor(b * amigaHalfBriteBrightness);

  // Convert back to hex and pad with zeros if necessary
  const toHex = (val: number) => val.toString(16).padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
