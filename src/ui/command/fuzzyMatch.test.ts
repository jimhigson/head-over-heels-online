import { expect, test } from "vitest";

import { fuzzyMatch } from "./fuzzyMatch";

test("empty query returns null (no highlight, item stays visible)", () => {
  expect<null | number[]>(fuzzyMatch("portableBlock", "")).toBe(null);
});

test("query that isn't a subsequence returns null", () => {
  expect<null | number[]>(fuzzyMatch("abc", "xyz")).toBe(null);
});

test("query longer than the text returns null", () => {
  expect<null | number[]>(fuzzyMatch("ab", "abc")).toBe(null);
});

test("a contiguous prefix matches the prefix indices", () => {
  expect<null | number[]>(fuzzyMatch("block_on_button", "block")).toEqual([
    0, 1, 2, 3, 4,
  ]);
});

test("the whole string matches every index", () => {
  expect<null | number[]>(fuzzyMatch("abc", "abc")).toEqual([0, 1, 2]);
});

test("prefers the camelCase-boundary run over an earlier scattered one", () => {
  // "portableBlock": the 'Bl' of Block (8,9), not the 'b'…'l' of portable
  expect<null | number[]>(fuzzyMatch("portableBlock", "bl")).toEqual([8, 9]);
});

test("prefers a single contiguous run over an earlier scattered match", () => {
  // "babar" + "bar": [2,3,4] is one run; [0,1,4] is scattered
  expect<null | number[]>(fuzzyMatch("babar", "bar")).toEqual([2, 3, 4]);
});

test("matches separated word-boundary starts", () => {
  // head_finds_market: 'f' of finds (5), 'm' of market (11)
  expect<null | number[]>(fuzzyMatch("head_finds_market", "fm")).toEqual([
    5, 11,
  ]);
});

test("is case-insensitive on the query", () => {
  expect<null | number[]>(fuzzyMatch("Block", "BL")).toEqual([0, 1]);
});

test("is case-insensitive on the text", () => {
  expect<null | number[]>(fuzzyMatch("BLOCK", "bl")).toEqual([0, 1]);
});

test("a single-character query matches its sole occurrence", () => {
  expect<null | number[]>(fuzzyMatch("abc", "b")).toEqual([1]);
});

test("contiguity outranks boundary count", () => {
  // "ab_a_b": "ab" can be the contiguous [0,1], or the boundary-aligned but
  // scattered [3,5] ('a' after '_', 'b' after '_'). Fewer runs wins.
  expect<null | number[]>(fuzzyMatch("ab_a_b", "ab")).toEqual([0, 1]);
});
