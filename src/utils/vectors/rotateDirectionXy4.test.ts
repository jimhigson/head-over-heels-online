import { expect, test } from "vitest";

import { type DirectionXy4, rotateDirectionXy4 } from "./vectors";

// a quarter-turn clockwise steps right→towards→left→away:
const clockwiseCycle: ReadonlyArray<[DirectionXy4, DirectionXy4]> = [
  ["right", "towards"],
  ["towards", "left"],
  ["left", "away"],
  ["away", "right"],
];

test.for(clockwiseCycle)("rotates %s clockwise", ([from, to]) => {
  expect(rotateDirectionXy4(from, "clockwise")).toBe(to);
});

test.for(clockwiseCycle)("anticlockwise is the inverse (%s)", ([from, to]) => {
  expect(rotateDirectionXy4(to, "anticlockwise")).toBe(from);
});

test("two quarter-turns make a half-turn", () => {
  expect(
    rotateDirectionXy4(rotateDirectionXy4("away", "clockwise"), "clockwise"),
  ).toBe("towards");
});
