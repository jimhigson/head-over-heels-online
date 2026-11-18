const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" &&
  value !== null &&
  Object.getPrototypeOf(value) === Object.prototype;

/**
 * `next`, but with every part of it that is deep-equal to the same part of
 * `previous` replaced by that part of `previous` - and `previous` itself if
 * the two are deep-equal. Lets a freshly computed value keep the identity of
 * whatever didn't change, so consumers comparing by reference (selectors,
 * memoised components) see only the real changes.
 *
 * Only plain objects and arrays are looked into; anything else is compared by
 * identity.
 */
export const replaceEqualDeep = <T>(
  /**
   * the value previously computed, if any
   */
  previous: unknown,
  next: T,
): T => {
  if (previous === next) {
    return next;
  }

  if (Array.isArray(previous) && Array.isArray(next)) {
    let allEqual = previous.length === next.length;
    const shared = next.map((nextElement, index) => {
      const sharedElement = replaceEqualDeep(previous[index], nextElement);
      allEqual &&= sharedElement === previous[index];
      return sharedElement;
    });
    return (allEqual ? previous : shared) as T;
  }

  if (isPlainObject(previous) && isPlainObject(next)) {
    const nextKeys = Object.keys(next);
    let allEqual = nextKeys.length === Object.keys(previous).length;
    const shared: Record<string, unknown> = {};
    for (const key of nextKeys) {
      shared[key] = replaceEqualDeep(previous[key], next[key]);
      allEqual &&= key in previous && shared[key] === previous[key];
    }
    return (allEqual ? previous : shared) as T;
  }

  return next;
};
