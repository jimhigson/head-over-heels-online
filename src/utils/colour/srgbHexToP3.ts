import { parseHex } from "./parseHex";

/**
 * Converts a hex colour to a CSS display-p3 colour string.
 * The numeric values are preserved (reinterpreted as P3, not converted),
 * giving a vibrancy boost on P3 displays.
 */
export const srgbHexToP3 = (hex: string): string => {
  const rgb = parseHex(hex);

  if (rgb === undefined) {
    // rgh is not a valid hex colour, may be 'transparent' or other reserved word colour - return as-is
    return hex;
  }

  const { r, g, b } = rgb;

  return `color(display-p3 ${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)})`;
};
