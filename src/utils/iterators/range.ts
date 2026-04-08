/**
 * Yield integers from start (inclusive) to end (exclusive), incrementing by step.
 * Based on iter-tools-es range: https://github.com/iter-tools/iter-tools/tree/master/src/impls/range
 * TODO: delete when Iterator.range() proposal is widely available (Stage 3 as of 2025)
 */
export function range(end: number): Generator<number>;
export function range(start: number, end: number): Generator<number>;
export function range(
  start: number,
  end: number,
  step: number,
): Generator<number>;
export function* range(
  startOrEnd: number,
  maybeEnd?: number,
  step = 1,
): Generator<number> {
  const start = maybeEnd === undefined ? 0 : startOrEnd;
  const end = maybeEnd === undefined ? startOrEnd : maybeEnd;

  for (let i = start; i < end; i += step) {
    yield i;
  }
}
