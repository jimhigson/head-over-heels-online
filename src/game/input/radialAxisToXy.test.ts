import { expect, test } from "vitest";

import { radialAxisToXy } from "./radialAxisToXy.ts";

test("returns neutral for values above threshold", () => {
  expect(radialAxisToXy(3.2)).toEqual({ x: 0, y: 0 });
});

test("returns up for -1.0", () => {
  expect(radialAxisToXy(-1.0)).toEqual({ x: 0, y: -1 });
});

test("returns up-right for -0.7", () => {
  expect(radialAxisToXy(-0.7)).toEqual({ x: 1, y: -1 });
});

test("returns right for -0.42", () => {
  expect(radialAxisToXy(-0.42)).toEqual({ x: 1, y: 0 });
});

test("returns down-right for -0.14", () => {
  expect(radialAxisToXy(-0.14)).toEqual({ x: 1, y: 1 });
});

test("returns down for 0.14", () => {
  expect(radialAxisToXy(0.14)).toEqual({ x: 0, y: 1 });
});

test("returns down-left for 0.42", () => {
  expect(radialAxisToXy(0.42)).toEqual({ x: -1, y: 1 });
});

test("returns left for 0.71", () => {
  expect(radialAxisToXy(0.71)).toEqual({ x: -1, y: 0 });
});

test("returns up-left for 1.0", () => {
  expect(radialAxisToXy(1.0)).toEqual({ x: -1, y: -1 });
});

test("handles slight variations in angle", () => {
  expect(radialAxisToXy(0.15)).toEqual({ x: 0, y: 1 });
});

test("handles values at boundary between directions", () => {
  expect(radialAxisToXy(0.28)).toEqual({ x: 0, y: 1 });
});
