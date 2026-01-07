import { parseHex } from "./parseHex";

/**
 * Converts a hex colour to a CSS display-p3 colour string.
 * The numeric values are preserved (reinterpreted as P3, not converted),
 * giving a vibrancy boost on P3 displays.
 */
export const srgbHexToP3 = (hex: string): string => {
  const { r, g, b } = parseHex(hex);
  return `color(display-p3 ${r / 255} ${g / 255} ${b / 255})`;
};
