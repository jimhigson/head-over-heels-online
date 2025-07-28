export const epsilon = 0.000_1;
export const negativeEpsilon = -0.000_1;
export const veryClose = (a: number, b: number): boolean =>
  Math.abs(a - b) < epsilon;

/**
 * protect against division by zero my making sure that a number can get very small
 * but not quite zero, while keeping the sign the same
 */
export const nonZero = (n: number): number =>
  n === 0 ? epsilon
  : Math.abs(n) < epsilon ? epsilon * Math.sign(n)
  : n;
