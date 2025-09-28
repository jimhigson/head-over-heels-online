/**
 * Clamps a value between a minimum and maximum value
 */
export const clamp = (
  /**
   * The value to clamp
   */
  value: number,
  /**
   * The minimum value
   */
  min: number,
  /**
   * The maximum value
   */
  max: number,
): number => Math.min(Math.max(value, min), max);
