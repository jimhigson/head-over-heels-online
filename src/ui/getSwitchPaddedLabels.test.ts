import { expect, test } from "vitest";

import { getSwitchPaddedLabels } from "./getSwitchPaddedLabels";

test("pads labels sliding from left to right for 4 options", () => {
  const input = ["1", "1.2", "1.5", "2"];
  // Field width of 6 (will fit longest label + padding)
  const result = getSwitchPaddedLabels(input);

  expect(result).toEqual(["1    ", " 1.2 ", "  1.5", "    2"]);
});

test("pads labels sliding from left to right for 4 options with x suffix", () => {
  const input = ["1x", "1.2x", "1.5x", "2x"];
  // Field width of 7 to accommodate longer labels
  const result = getSwitchPaddedLabels(input);

  expect(result).toEqual(["1x    ", " 1.2x ", "  1.5x", "    2x"]);
});

test("pads labels for 2 options", () => {
  const input = ["ON", "OFF"];
  const result = getSwitchPaddedLabels(input);

  expect(result).toEqual(["ON  ", " OFF"]);
});

test("pads labels for 3 single-char options", () => {
  const input = ["A", "B", "C"];
  const result = getSwitchPaddedLabels(input);

  expect(result).toEqual(["A  ", " B ", "  C"]);
});

test("pads labels for 3 options of unequal length", () => {
  const input = ["4", "8", "AL"];
  const result = getSwitchPaddedLabels(input);

  expect(result).toEqual(["4   ", " 8  ", "  AL"]);
});

test("pads labels for 3 options of equal length", () => {
  const input = ["4W", "8W", "AL"];
  const result = getSwitchPaddedLabels(input);

  expect(result).toEqual(["4W  ", " 8W ", "  AL"]);
});

test("centers single option", () => {
  const input = ["ONLY"];
  const result = getSwitchPaddedLabels(input);

  expect(result).toEqual(["ONLY"]);
});

test("handles 5 options with progressive sliding", () => {
  const input = ["1", "2", "3", "4", "5"];
  const result = getSwitchPaddedLabels(input);

  expect(result).toEqual(["1    ", " 2   ", "  3  ", "   4 ", "    5"]);
});
