// based on https://github.com/iter-tools/iter-tools/blob/master/src/impls/%24concat/__tests__/%24concat.test.ts
import { expect, it } from "vitest";

import { concat } from "./concat";

it("yields no values when there are no sources", () => {
  expect<unknown[]>([...concat()]).toEqual([]);
});

it("yields no values when sources are empty", () => {
  expect<number[]>([...concat([], [])]).toEqual([]);
});

it("yields each source's values in sequence", () => {
  expect<number[]>([...concat([1, 2], [3, 4])]).toEqual([1, 2, 3, 4]);
});

it("works with generators", () => {
  function* a() {
    yield 1;
    yield 2;
  }
  function* b() {
    yield 3;
  }
  expect<number[]>([...concat(a(), b())]).toEqual([1, 2, 3]);
});
