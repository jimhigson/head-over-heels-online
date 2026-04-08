// based on https://github.com/iter-tools/iter-tools/blob/master/src/impls/%24size/__tests__/%24size.test.ts
import { expect, it } from "vitest";

import { size } from "./size";

it("returns 0 for empty iterables", () => {
  expect<number>(size([])).toBe(0);
});

it("returns the number of values in the iterable", () => {
  expect<number>(size([1, 2, 3, 4, 5, 6])).toBe(6);
});

it("works with generators", () => {
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }
  expect<number>(size(gen())).toBe(3);
});
