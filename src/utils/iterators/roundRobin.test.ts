// based on https://github.com/iter-tools/iter-tools/blob/master/src/impls/%24round-robin/__tests__/%24round-robin.test.ts
import { expect, it } from "vitest";

import { roundRobin } from "./roundRobin";

it("interleaves values from multiple iterables", () => {
  expect<number[]>([...roundRobin([1, 4, 7], [2, 5, 8], [3, 6, 9])]).toEqual([
    1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
});

it("works with input iterables of different lengths", () => {
  expect<number[]>([...roundRobin([], [1, 3], [2])]).toEqual([1, 2, 3]);
});

it("yields nothing when all inputs are empty", () => {
  expect<number[]>([...roundRobin([], [])]).toEqual([]);
});

it("yields nothing when no inputs given", () => {
  expect<unknown[]>([...roundRobin()]).toEqual([]);
});
