import { expect, test } from "vitest";
import { eachAxis } from "./eachAxis";

test("making a vector from zero vectors", () => {
  expect(eachAxis(() => 42)).toEqual({
    x: 42,
    y: 42,
    z: 42,
  });
});

test("making a vector from two vectors", () => {
  expect(
    eachAxis((a, b) => a + b, { x: 1, y: 2, z: 3 }, { x: 10, y: 20, z: 30 }),
  ).toEqual({
    x: 11,
    y: 22,
    z: 33,
  });
});

test("making a vector from three vectors", () => {
  expect(
    eachAxis(
      (a, b, c) => a + b + c,
      { x: 1, y: 2, z: 3 },
      { x: 10, y: 20, z: 30 },
      { x: 100, y: 200, z: 300 },
    ),
  ).toEqual({
    x: 111,
    y: 222,
    z: 333,
  });
});
