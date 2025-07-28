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
