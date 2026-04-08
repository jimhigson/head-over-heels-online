// based on https://github.com/iter-tools/iter-tools/blob/master/src/impls/%24is-empty/__tests__/%24is-empty.test.ts
import { expect, it } from "vitest";

import { isEmpty } from "./isEmpty";

it("returns true for empty iterables", () => {
  expect<boolean>(isEmpty([])).toBe(true);
});

it("returns false when iterable has values", () => {
  expect<boolean>(isEmpty([1])).toBe(false);
  expect<boolean>(isEmpty([1, 2])).toBe(false);
});

it("works with generators", () => {
  function* empty() {}
  function* nonEmpty() {
    yield 1;
  }
  expect<boolean>(isEmpty(empty())).toBe(true);
  expect<boolean>(isEmpty(nonEmpty())).toBe(false);
});
