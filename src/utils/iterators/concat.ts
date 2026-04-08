/**
 * Yield all values from each iterable in sequence.
 * Based on iter-tools-es concat: https://github.com/iter-tools/iter-tools/tree/master/src/impls/%24concat
 */
export function* concat<T>(...iterables: Iterable<T>[]): Generator<T> {
  for (const iterable of iterables) {
    yield* iterable;
  }
}
