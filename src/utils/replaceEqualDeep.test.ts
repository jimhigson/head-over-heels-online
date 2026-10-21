import { expect, test } from "vitest";

import { replaceEqualDeep } from "./replaceEqualDeep";

test("gives back the previous value when deep-equal to the next", () => {
  const previous = { a: [1, { b: 2 }], c: "c" };

  expect(replaceEqualDeep(previous, { a: [1, { b: 2 }], c: "c" })).toBe(
    previous,
  );
});

test("keeps the identity of the parts that didn't change", () => {
  const previous = { unchanged: { b: [1, 2] }, changed: { d: 1 } };

  const shared = replaceEqualDeep(previous, {
    unchanged: { b: [1, 2] },
    changed: { d: 2 },
  });

  expect(shared.unchanged).toBe(previous.unchanged);
});

test("gives a new value where a part changed", () => {
  const previous = { unchanged: { b: [1, 2] }, changed: { d: 1 } };

  expect(
    replaceEqualDeep(previous, {
      unchanged: { b: [1, 2] },
      changed: { d: 2 },
    }),
  ).toEqual({ unchanged: { b: [1, 2] }, changed: { d: 2 } });
});

test("treats a removed key as a change", () => {
  const previous = { a: 1, b: 2 };

  expect(replaceEqualDeep(previous, { a: 1 })).not.toBe(previous);
});

test("treats arrays of different lengths as changed", () => {
  const previous = [1, 2, 3];

  expect(replaceEqualDeep(previous, [1, 2])).toEqual([1, 2]);
});
