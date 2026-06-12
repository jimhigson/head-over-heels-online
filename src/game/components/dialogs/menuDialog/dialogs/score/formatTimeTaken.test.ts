import { expect, test } from "vitest";

import { formatTimeTaken } from "./formatTimeTaken";

test.for([
  [0, "0:00"],
  [59_499, "0:59"],
  // rounds to the nearest second, carrying into the minute:
  [59_500, "1:00"],
  [754_000, "12:34"],
  [3_599_499, "59:59"],
  // hours only shown from one hour up:
  [3_599_500, "1:00:00"],
  // minutes and seconds are zero-padded once hours are shown:
  [4_321_000, "1:12:01"],
  [36_061_000, "10:01:01"],
] as const)("formats %ims as %s", ([timeTakenMs, formatted]) => {
  expect(formatTimeTaken(timeTakenMs)).toBe(formatted);
});
