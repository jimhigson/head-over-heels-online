import { expect, test } from "vitest";

import { deathCameraEffect, noDeathCameraEffect } from "./deathCameraEffect";

const degrees = (realMs: number) =>
  (deathCameraEffect(realMs).spinRadians * 180) / Math.PI;

test("the swing has not moved at the instant of death", () => {
  // closeTo, not toBe: a negative rate times zero gives -0
  expect(degrees(0)).toBeCloseTo(0);
});

test("the swing eases in - its first 500ms cover less than its next 500ms", () => {
  expect(degrees(500)).toBeGreaterThan(degrees(1_000) - degrees(500));
});

test("the swing reaches its steady rate once eased in", () => {
  // six degrees per second, measured over a second well past the ease-in:
  expect(degrees(6_000) - degrees(5_000)).toBeCloseTo(-6, 1);
});

test("the swing keeps turning however long the death lasts", () => {
  // two minutes at six degrees a second, less the ground the ease-in gave up:
  expect(degrees(120_000)).toBeCloseTo(-6 * 120 + 7.5, 0);
});

test("the room settles on the dying character and stays there", () => {
  expect(deathCameraEffect(60_000).centringFraction).toBe(1);
});

test("nobody dying leaves the camera exactly where it was", () => {
  expect(noDeathCameraEffect).toEqual({ spinRadians: 0, centringFraction: 0 });
});
