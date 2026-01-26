export type Rgb = { r: number; g: number; b: number };

/**
 * Parses a hex colour string to RGB values in range 0-255.
 * Returns undefined if the string is not a valid hex colour.
 */
export const parseHex = (hex: string): Rgb | undefined => {
  const match = hex.match(
    /^#?(?<r>[0-9a-f]{2})(?<g>[0-9a-f]{2})(?<b>[0-9a-f]{2})$/i,
  );
  if (!match?.groups) {
    return undefined;
  }
  const { r, g, b } = match.groups;
  return {
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16),
  };
};
