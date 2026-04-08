// based on https://github.com/iter-tools/iter-tools/blob/master/src/impls/%24first/__tests__/%24first.test.ts
import { expect, it } from "vitest";

import { first } from "./first";

it("returns the first value", () => {
  expect<number | undefined>(first([1, 2, 3])).toBe(1);
});

it("returns undefined for empty iterables", () => {
  expect<never | undefined>(first([])).toBe(undefined);
});

it("works with generators", () => {
  function* gen() {
    yield "a";
    yield "b";
  }
  expect<string | undefined>(first(gen())).toBe("a");
});
