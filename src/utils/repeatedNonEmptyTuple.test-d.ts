import { expectTypeOf, test } from "vitest";

import { repeatedNonEmptyTuple } from "./repeatedNonEmptyTuple";

test("a literal count above 0 gives a non-empty tuple of the literal value", () => {
  expectTypeOf(repeatedNonEmptyTuple("plain", 3)).toEqualTypeOf<
    ["plain", ...Array<"plain">]
  >();
});

test("a count of 0 is a type error", () => {
  // @ts-expect-error - the result would be empty
  repeatedNonEmptyTuple("plain", 0);
});

test("a count that is not a literal is a type error", () => {
  const count: number = 3;
  // @ts-expect-error - the count might be 0
  repeatedNonEmptyTuple("plain", count);
});
