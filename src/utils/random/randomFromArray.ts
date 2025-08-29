export const randomFromArray = <T>(array: Readonly<T[]> | T[]): T =>
  array[Math.floor(Math.random() * array.length)];

/**
 * Returns a random number between min and max (inclusive)
 */
export const randomBetween = (min: number, max: number): number =>
  min + Math.random() * (max - min);
