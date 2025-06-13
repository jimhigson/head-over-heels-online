export const roundToNearest = (value: number, nearest: number): number => {
  if (nearest === 0) {
    return value;
  }
  return Math.round(value / nearest) * nearest;
};

/** returns the fractional part of a number */
export const frac = (value: number): number => {
  return value - Math.floor(value);
};
