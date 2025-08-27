import { expect, test } from "vitest";

import { normalise } from "./normalise";

test("normalizes value at minimum to 0", () => {
  expect(normalise(0, 0, 10)).toBe(0);
  expect(normalise(-5, -5, 5)).toBe(0);
});

test("normalizes value at maximum to 1", () => {
  expect(normalise(10, 0, 10)).toBe(1);
  expect(normalise(5, -5, 5)).toBe(1);
});

test("normalizes value at midpoint to 0.5", () => {
  expect(normalise(5, 0, 10)).toBe(0.5);
  expect(normalise(0, -5, 5)).toBe(0.5);
});

test("returns values less than 0 when x is below minimum", () => {
  expect(normalise(-5, 0, 10)).toBe(-0.5);
  expect(normalise(-10, -5, 5)).toBe(-0.5);
});

test("returns values greater than 1 when x is above maximum", () => {
  expect(normalise(15, 0, 10)).toBe(1.5);
  expect(normalise(10, -5, 5)).toBe(1.5);
});

test("handles negative ranges correctly", () => {
  expect(normalise(-3, -5, -1)).toBe(0.5);
  expect(normalise(-5, -5, -1)).toBe(0);
  expect(normalise(-1, -5, -1)).toBe(1);
});

test("handles min equals max edge case", () => {
  expect(normalise(5, 5, 5)).toBe(0.5);
  expect(normalise(6, 5, 5)).toBe(Number.POSITIVE_INFINITY);
  expect(normalise(4, 5, 5)).toBe(Number.NEGATIVE_INFINITY);
});

test("works with fractional values", () => {
  expect(normalise(2.5, 0, 5)).toBe(0.5);
  expect(normalise(7.5, 5, 10)).toBe(0.5);
  expect(normalise(0.25, 0, 1)).toBe(0.25);
});
