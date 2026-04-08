/**
 * Check whether an iterable has no items.
 * Based on iter-tools-es isEmpty: https://github.com/iter-tools/iter-tools/tree/master/src/impls/%24is-empty
 */
export const isEmpty = (
  iterable: Iterable<unknown> | null | undefined,
): boolean => {
  if (iterable == null) return true;
  for (const _ of iterable) return false;
  return true;
};
