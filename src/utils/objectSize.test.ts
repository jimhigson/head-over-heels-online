import { expect, it } from "vitest";

import { objectSize } from "./objectSize";

it("returns 0 for empty objects", () => {
  expect<number>(objectSize({})).toBe(0);
});

it("counts enumerable properties", () => {
  expect<number>(objectSize({ a: 1, b: 2, c: 3 })).toBe(3);
});
