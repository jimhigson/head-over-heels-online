import { expect, it } from "vitest";

import { keysIter, objectEntriesIter, valuesIter } from "./entries";

it("valuesIter yields own values lazily", () => {
  const obj = { a: 1, b: 2, c: 3 };
  expect<number[]>(valuesIter(obj).toArray()).toEqual([1, 2, 3]);
});

it("valuesIter yields nothing for empty objects", () => {
  expect<never[]>(valuesIter<never>({}).toArray()).toEqual([]);
});

it("keysIter yields own keys lazily", () => {
  const obj = { a: 1, b: 2 };
  expect<string[]>(keysIter(obj).toArray()).toEqual(["a", "b"]);
});

it("objectEntriesIter yields own entries lazily", () => {
  const obj = { a: 1, b: 2 };
  expect<[string, number][]>(objectEntriesIter(obj).toArray()).toEqual([
    ["a", 1],
    ["b", 2],
  ]);
});

it("objectEntriesIter yields nothing for empty objects", () => {
  expect(objectEntriesIter({}).toArray()).toEqual([]);
});
