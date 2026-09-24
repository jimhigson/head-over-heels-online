import { expect, test } from "vitest";

import { valueAtPath } from "./valueAtPath";

test("empty path gives the root", () => {
  const root = { a: 1 };
  expect(valueAtPath(root, "")).toBe(root);
});

test("follows nested object keys and array indices", () => {
  expect(valueAtPath({ a: { b: [10, 20] } }, "a.b.1")).toBe(20);
});

test("a path through a primitive leads nowhere", () => {
  expect(valueAtPath({ a: 1 }, "a.b")).toBeUndefined();
});
