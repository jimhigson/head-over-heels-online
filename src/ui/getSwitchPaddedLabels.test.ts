import { expect, test } from "vitest";

import { getSwitchPaddedLabels } from "./getSwitchPaddedLabels";

test("pads labels sliding from left to right for 4 options", () => {
  const input = ["1", "1.2", "1.5", "2"];
  // Field width of 6 (will fit longest label + padding)
  const result = getSwitchPaddedLabels(input);

  // Visual representation of expected output
  expect(result).toEqual([
    "1     ", // leftmost (0 before, 5 after)
    " 1.2  ", // position 1/3 = 0.33 -> 1 before, 2 after
    "  1.5 ", // position 2/3 = 0.67 -> 2 before, 1 after
    "     2", // rightmost (5 before, 0 after)
  ]);
});

test("pads labels sliding from left to right for 4 options with x suffix", () => {
  const input = ["1x", "1.2x", "1.5x", "2x"];
  // Field width of 7 to accommodate longer labels
  const result = getSwitchPaddedLabels(input);

  // Visual representation of expected output
  expect(result).toEqual([
    "1x     ", // leftmost (0 before, 5 after)
    " 1.2x  ", // position 1/3 = 0.33 -> 1 before, 2 after
    "  1.5x ", // position 2/3 = 0.67 -> 2 before, 1 after
    "     2x", // rightmost (5 before, 0 after)
  ]);
});

test("pads labels for 2 options", () => {
  const input = ["ON", "OFF"];
  const result = getSwitchPaddedLabels(input);

  expect(result).toEqual([
    "ON  ", // left aligned (0 before, 3 after for width 5)
    " OFF", // right aligned (2 before, 0 after for width 5)
  ]);
});

test("pads labels for 3 options", () => {
  const input = ["A", "B", "C"];
  const result = getSwitchPaddedLabels(input);

  expect(result).toEqual([
    "A  ", // left aligned (position 0/2 = 0.0)
    " B ", // centered (position 1/2 = 0.5, 1 before, 1 after)
    "  C", // right aligned (position 2/2 = 1.0)
  ]);
});

test("centers single option", () => {
  const input = ["ONLY"];
  const result = getSwitchPaddedLabels(input);

  expect(result).toEqual(["ONLY"]);
});

test("handles 5 options with progressive sliding", () => {
  const input = ["1", "2", "3", "4", "5"];
  const result = getSwitchPaddedLabels(input);

  expect(result).toEqual([
    "1    ", // 0 before, 4 after
    " 2   ", // 1 before, 3 after
    "  3  ", // 2 before, 2 after
    "   4 ", // 3 before, 1 after
    "    5", // 4 before, 0 after
  ]);
});
