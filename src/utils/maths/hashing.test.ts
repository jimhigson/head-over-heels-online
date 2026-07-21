import { expect, test } from "vitest";

import {
  hashNumberToNumber0to1,
  hashXyzToNumber0to1,
  phaseForSubItem,
} from "./hashing";

test("is deterministic for a given position", () => {
  expect(hashXyzToNumber0to1({ x: 3, y: 4, z: 5 })).toBe(
    hashXyzToNumber0to1({ x: 3, y: 4, z: 5 }),
  );
});

test("always returns a number in [0, 1)", () => {
  const samples = Array.from({ length: 30 }, (_, x) =>
    Array.from({ length: 30 }, (_, y) => hashXyzToNumber0to1({ x, y, z: 0 })),
  ).flat();
  expect(samples.every((h) => h >= 0 && h < 1)).toBe(true);
});

test("distinguishes positions one grid step apart", () => {
  expect(hashXyzToNumber0to1({ x: 1, y: 0, z: 0 })).not.toBe(
    hashXyzToNumber0to1({ x: 2, y: 0, z: 0 }),
  );
});

test("distinguishes positions one eighth-grid step apart (fractional)", () => {
  expect(hashXyzToNumber0to1({ x: 0, y: 0, z: 3.375 })).not.toBe(
    hashXyzToNumber0to1({ x: 0, y: 0, z: 3.5 }),
  );
});

// small, nearby coordinates must not all hash near zero (a plain xor would) -
// otherwise every animation would start on frame 0, defeating the de-sync
test("spreads small nearby coordinates across the range, not clustered at 0", () => {
  const lowCorner = Array.from({ length: 8 }, (_, x) =>
    Array.from({ length: 8 }, (_, y) => hashXyzToNumber0to1({ x, y, z: 0 })),
  ).flat();
  const aboveHalf = lowCorner.filter((h) => h >= 0.5).length;
  // with good spread roughly half land in the upper half of [0, 1)
  expect(aboveHalf).toBeGreaterThan(lowCorner.length / 4);
});

test("phaseForSubItem gives a different phase per index", () => {
  expect(phaseForSubItem(0.2, 0)).not.toBe(phaseForSubItem(0.2, 1));
});

test("phaseForSubItem stays in [0, 1)", () => {
  const phases = Array.from({ length: 50 }, (_, i) => phaseForSubItem(0.9, i));
  expect(phases.every((p) => p >= 0 && p < 1)).toBe(true);
});

test("phaseForSubItem treats an absent hash as zero", () => {
  expect(phaseForSubItem(undefined, 0)).toBe(0);
});

test("hashNumberToNumber0to1 is deterministic for a given input", () => {
  expect(hashNumberToNumber0to1(0.318 + 1_234)).toBe(
    hashNumberToNumber0to1(0.318 + 1_234),
  );
});

test("hashNumberToNumber0to1 always returns a number in [0, 1)", () => {
  const samples = Array.from({ length: 500 }, (_, i) =>
    hashNumberToNumber0to1(i / 500 + i),
  );
  expect(samples.every((h) => h >= 0 && h < 1)).toBe(true);
});

// item hashes are themselves values in [0, 1), so nearby fractions must not
// collide or cluster
test("hashNumberToNumber0to1 distinguishes close values in [0, 1)", () => {
  expect(hashNumberToNumber0to1(0.318)).not.toBe(hashNumberToNumber0to1(0.319));
});

test("hashNumberToNumber0to1 distinguishes whole-part differences", () => {
  expect(hashNumberToNumber0to1(0.318 + 40)).not.toBe(
    hashNumberToNumber0to1(0.318 + 80),
  );
});
