/**
 * Normalizes a value to the 0..1 range based on its position between min and max.
 * Returns values outside 0..1 if x is outside the min..max range.
 *
 * @returns The normalized value in the 0..1 range (or outside if x is outside min..max)
 */

export const normalise = (
  /**
   * The value to normalize
   */
  x: number,
  /**
   * The minimum value of the range
   */
  min: number,
  /**
   * The maximum value of the range
   */
  max: number,
): number => {
  if (min === max) {
    // When min equals max, the value is either at that exact point (return 0.5 as a reasonable choice)
    // or outside it (return +/- infinity based on which side)
    if (x === min) return 0.5;
    return x > min ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  }

  return (x - min) / (max - min);
};
