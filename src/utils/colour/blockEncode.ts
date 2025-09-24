/**
 * Block-based encoding for RGB colors, for converting from rgb->xy
 * so that information for each rgb value can be stored on a texture
 * and indexed by xy coordinates.
 *
 * Divides the color space into blocks to preserve some locality
 */

export const blockEncodeRgbBitDepth = 6;

/**
 * Encodes RGB values using a block-based layout
 * The 512x512 texture is divided into 8x8 blocks of 64x64 pixels each
 * Each block represents a range of blue values
 * Within each block, red is X axis and green is Y axis
 */
export function* getBlockNeighborhood(
  /** Red value 0.0-1.0 */
  r: number,
  /** Green value 0.0-1.0 */
  g: number,
  /** Blue value 0.0-1.0 */
  b: number,
  /** Radius in 6-bit color space */
  radius: number = 1,
): Generator<{ x: number; y: number; distance: number }> {
  const maxValue = 2 ** blockEncodeRgbBitDepth - 1;

  // Convert to 6-bit integers (0-63)
  const r6 = Math.floor(r * maxValue + 0.5);
  const g6 = Math.floor(g * maxValue + 0.5);
  const b6 = Math.floor(b * maxValue + 0.5);

  // Check all positions within the radius in RGB space
  for (let dr = -radius; dr <= radius; dr++) {
    for (let dg = -radius; dg <= radius; dg++) {
      for (let db = -radius; db <= radius; db++) {
        const nr = r6 + dr;
        const ng = g6 + dg;
        const nb = b6 + db;

        // Skip out-of-bounds values
        if (
          nr < 0 ||
          nr > maxValue ||
          ng < 0 ||
          ng > maxValue ||
          nb < 0 ||
          nb > maxValue
        ) {
          continue;
        }

        // Calculate distance in RGB space
        const distance = Math.sqrt(dr * dr + dg * dg + db * db);

        // Block-based encoding:
        // Blue determines which block
        const blockX = (nb % 8) * 64;
        const blockY = Math.floor(nb / 8) * 64;

        // Within the block, red is X and green is Y
        const x = blockX + nr;
        const y = blockY + ng;

        yield { x, y, distance };
      }
    }
  }
}
