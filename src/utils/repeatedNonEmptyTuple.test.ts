import { expect, test } from "vitest";

import { repeatedNonEmptyTuple } from "./repeatedNonEmptyTuple";

test("gives the given number of copies of the value", () => {
  expect(repeatedNonEmptyTuple("plain", 3)).toEqual([
    "plain",
    "plain",
    "plain",
  ]);
});

test("gives one copy for a count of 1", () => {
  expect(repeatedNonEmptyTuple("plain", 1)).toEqual(["plain"]);
});
