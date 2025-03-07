import { Color } from "pixi.js";

export const halfBrite = (c: Color) => {
  const [r, g, b] = c.toUint8RgbArray();
  const hb = new Color({ r: r / 2, g: g / 2, b: b / 2 });
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
  r = Math.floor(r / 2);
  g = Math.floor(g / 2);
  b = Math.floor(b / 2);

  // Convert back to hex and pad with zeros if necessary
  const toHex = (val: number) => val.toString(16).padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
