export const roundToNearest = (value: number, increment: number): number => {
  if (increment === 0) {
    return value;
  }
  return Math.round(value / increment) * increment;
};

/** returns the fractional part of a number */
export const frac = (value: number): number => {
  return value - Math.floor(value);
};

/** glsl-style smoothstep: 0 at edge0, 1 at edge1, with a smooth hermite curve between */
export const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};
