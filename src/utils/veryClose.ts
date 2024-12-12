export const epsilon = 0.001;
export const veryClose = (a: number, b: number): boolean =>
  Math.abs(a - b) < epsilon;
