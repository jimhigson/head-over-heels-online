import { expect, test } from "vitest";

import { type DirectionXy8, rotateDirectionXy8 } from "./vectors";

// two octants (90°) clockwise steps the cardinal facings right→towards→left→away:
const clockwiseCardinalCycle: ReadonlyArray<[DirectionXy8, DirectionXy8]> = [
  ["right", "towards"],
  ["towards", "left"],
  ["left", "away"],
  ["away", "right"],
];

test.for(clockwiseCardinalCycle)(
  "two octants rotates %s clockwise to the next cardinal",
  ([from, to]) => {
    expect(rotateDirectionXy8(from, "clockwise", 2)).toBe(to);
  },
);

test.for(clockwiseCardinalCycle)(
  "anticlockwise is the inverse of clockwise (%s)",
  ([from, to]) => {
    expect(rotateDirectionXy8(to, "anticlockwise", 2)).toBe(from);
  },
);

test("two octants keeps a diagonal facing diagonal", () => {
  expect<DirectionXy8>(rotateDirectionXy8("awayRight", "clockwise", 2)).toBe(
    "towardsRight",
  );
});

test("two quarter-turns make a half-turn", () => {
  expect(
    rotateDirectionXy8(
      rotateDirectionXy8("away", "clockwise", 2),
      "clockwise",
      2,
    ),
  ).toBe("towards");
});

// one octant (45°) clockwise steps through all eight directions in ring order:
const oneOctantClockwiseCycle: ReadonlyArray<[DirectionXy8, DirectionXy8]> = [
  ["right", "towardsRight"],
  ["towardsRight", "towards"],
  ["towards", "towardsLeft"],
  ["towardsLeft", "left"],
  ["left", "awayLeft"],
  ["awayLeft", "away"],
  ["away", "awayRight"],
  ["awayRight", "right"],
];

test.for(oneOctantClockwiseCycle)(
  "one octant rotates %s a 45° clockwise step",
  ([from, to]) => {
    expect(rotateDirectionXy8(from, "clockwise", 1)).toBe(to);
  },
);

test("one octant anticlockwise is the inverse", () => {
  expect(rotateDirectionXy8("towards", "anticlockwise", 1)).toBe(
    "towardsRight",
  );
});
