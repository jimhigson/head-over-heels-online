import { expect, test } from "vitest";

import { deathCameraEffect, noDeathCameraEffect } from "./deathCameraEffect";

const degrees = (realMs: number) =>
  (deathCameraEffect(realMs).spinRadians * 180) / Math.PI;

test("the swing has not moved at the instant of death", () => {
  // closeTo, not toBe: a negative rate times zero gives -0
  expect(degrees(0)).toBeCloseTo(0);
});

test("the swing eases in - its first 200ms cover less than its next 200ms", () => {
  expect(degrees(200)).toBeGreaterThan(degrees(400) - degrees(200));
});

test("the swing is up to its steady rate a second in", () => {
  // twelve degrees per second, measured over a second well past the ease-in:
  expect(degrees(4_000) - degrees(3_000)).toBeCloseTo(-12, 1);
});

test("the swing keeps turning however long the death lasts", () => {
  expect(degrees(120_000)).toBeCloseTo(-12 * 120 + 6, 0);
});

test("the room settles on the dying character and stays there", () => {
  expect(deathCameraEffect(60_000).centringFraction).toBe(1);
});

test("nobody dying leaves the camera exactly where it was", () => {
  expect(noDeathCameraEffect).toEqual({ spinRadians: 0, centringFraction: 0 });
});
