/**
 * Infinitely repeat the values from an iterable. Empty iterables yield nothing.
 * Based on iter-tools-es cycle: https://github.com/iter-tools/iter-tools/tree/master/src/impls/%24cycle
 */
export function* cycle<T>(iterable: Iterable<T>): Generator<T> {
  const items: T[] = [];
  for (const item of iterable) {
    items.push(item);
    yield item;
  }
  if (items.length === 0) return;
  for (;;) {
    yield* items;
  }
}
