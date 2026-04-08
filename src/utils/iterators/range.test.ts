// based on https://github.com/iter-tools/iter-tools/blob/master/src/impls/range/__tests__/range.test.ts
import { expect, it } from "vitest";

import { range } from "./range";

it("yields integers from 0 to end", () => {
  expect<number[]>([...range(3)]).toEqual([0, 1, 2]);
});

it("yields integers from start to end", () => {
  expect<number[]>([...range(1, 4)]).toEqual([1, 2, 3]);
});

it("yields integers from start to end with step", () => {
  expect<number[]>([...range(1, 7, 2)]).toEqual([1, 3, 5]);
  expect<number[]>([...range(1, 6, 2)]).toEqual([1, 3, 5]);
});

it("yields nothing when end equals start", () => {
  expect<number[]>([...range(3, 3)]).toEqual([]);
});

it("yields nothing when end is less than start", () => {
  expect<number[]>([...range(5, 3)]).toEqual([]);
});
