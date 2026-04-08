/**
 * Count the number of items in an iterable.
 * Based on iter-tools-es size: https://github.com/iter-tools/iter-tools/tree/master/src/impls/%24size
 */
export const size = (
  iterable: Iterable<unknown> | null | undefined,
): number => {
  if (iterable == null) return 0;
  let count = 0;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- deliberately unused, just counting
  for (const _unused of iterable) count++;
  return count;
};
