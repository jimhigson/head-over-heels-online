// based on https://github.com/iter-tools/iter-tools/blob/master/src/impls/%24cycle/__tests__/%24cycle.test.ts
import { expect, it } from "vitest";

import { cycle } from "./cycle";

it("yields nothing for empty iterables", () => {
  expect<number[]>([...cycle([])]).toEqual([]);
});

it("yields values repeatedly", () => {
  const result = cycle([1, 2, 3]).take(7).toArray();
  expect<number[]>(result).toEqual([1, 2, 3, 1, 2, 3, 1]);
});

it("works with generators", () => {
  function* gen() {
    yield "a";
    yield "b";
  }
  const result = cycle(gen()).take(5).toArray();
  expect<string[]>(result).toEqual(["a", "b", "a", "b", "a"]);
});
