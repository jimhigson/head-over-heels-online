export type Rgb = { r: number; g: number; b: number };

/**
 * Parses a hex colour string to RGB values in range 0-255
 */
export const parseHex = (hex: string): Rgb => {
  const h = hex.replace(/^#/, "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
};
