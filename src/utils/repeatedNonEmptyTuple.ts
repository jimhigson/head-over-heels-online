import type { GreaterThan } from "type-fest";

import type { WritableNonEmptyTuple } from "./types/WritableNonEmptyTuple";

/**
 * `count` copies of `value`. The type requires `count` to be a literal above 0,
 * so the result is never empty
 */
export const repeatedNonEmptyTuple = <
  Value extends string,
  Count extends number,
>(
  value: Value,
  count: Count & (GreaterThan<Count, 0> extends true ? unknown : never),
): WritableNonEmptyTuple<Value> => [
  value,
  ...Array.from({ length: count - 1 }, () => value),
];
