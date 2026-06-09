import { expect, test } from "vitest";

import { type Run, runsOf } from "./runsOf";

test("no matched indices yields a single unmatched run", () => {
  expect<Run[]>(runsOf("abc", new Set())).toEqual<Run[]>([
    { text: "abc", matched: false },
  ]);
});

test("all indices matched yields a single matched run", () => {
  expect<Run[]>(runsOf("abc", new Set([0, 1, 2]))).toEqual<Run[]>([
    { text: "abc", matched: true },
  ]);
});

test("a matched group in the middle splits into three runs", () => {
  expect<Run[]>(runsOf("abcd", new Set([1, 2]))).toEqual<Run[]>([
    { text: "a", matched: false },
    { text: "bc", matched: true },
    { text: "d", matched: false },
  ]);
});

test("a leading matched character", () => {
  expect<Run[]>(runsOf("abc", new Set([0]))).toEqual<Run[]>([
    { text: "a", matched: true },
    { text: "bc", matched: false },
  ]);
});

test("a trailing matched character", () => {
  expect<Run[]>(runsOf("abc", new Set([2]))).toEqual<Run[]>([
    { text: "ab", matched: false },
    { text: "c", matched: true },
  ]);
});

test("alternating matches do not merge", () => {
  expect<Run[]>(runsOf("abc", new Set([0, 2]))).toEqual<Run[]>([
    { text: "a", matched: true },
    { text: "b", matched: false },
    { text: "c", matched: true },
  ]);
});

test("empty text yields no runs", () => {
  expect<Run[]>(runsOf("", new Set())).toEqual<Run[]>([]);
});
