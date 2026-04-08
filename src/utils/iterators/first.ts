/**
 * Return the first value from an iterable, or undefined if empty.
 * Based on iter-tools-es first: https://github.com/iter-tools/iter-tools/tree/master/src/impls/%24first
 */
export const first = <T>(iterable: Iterable<T>): T | undefined => {
  for (const value of iterable) return value;
  return undefined;
};
