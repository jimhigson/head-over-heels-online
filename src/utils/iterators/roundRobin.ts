/**
 * Interleave values from multiple iterables, taking one from each in turn.
 * Based on iter-tools-es roundRobin: https://github.com/iter-tools/iter-tools/tree/master/src/impls/%24round-robin
 */
export function* roundRobin<T>(...iterables: Iterable<T>[]): Generator<T> {
  const iterators = iterables.map((it) => Iterator.from(it));
  const active = new Set(iterators.keys());

  while (active.size > 0) {
    for (const i of active) {
      const { value, done } = iterators[i].next();
      if (done) {
        active.delete(i);
      } else {
        yield value;
      }
    }
  }
}
