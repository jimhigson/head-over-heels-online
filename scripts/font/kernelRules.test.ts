import { expect, test } from "vitest";

import {
  type KernelRule,
  kernelRules,
  kernelRulesForChar,
  scanKernelRules,
} from "./kernelRules";

const bitmapOf = (rows: string[]): boolean[][] =>
  rows.map((row) => [...row].map((ch) => ch === "#"));

const ruleNamed = (name: string): KernelRule => {
  const rule = kernelRules.find((r) => r.name === name);
  if (rule === undefined) {
    throw new Error(`no kernel rule named ${name}`);
  }
  return rule;
};
const isolatedHole = ruleNamed("isolatedHole");
const verticalSlotHole = ruleNamed("verticalSlotHole");

test("isolatedHole claims a single no-ink cell ringed by ink", () => {
  expect(scanKernelRules(bitmapOf(["###", "#.#", "###"]), kernelRules)).toEqual(
    [{ rule: isolatedHole, x: 1, y: 1 }],
  );
});

test("isolatedHole does not claim a hole open to the glyph edge", () => {
  // outside the bitmap reads as no-ink, so the ring is incomplete
  expect(scanKernelRules(bitmapOf(["##", "#."]), kernelRules)).toEqual([]);
});

test("isolatedHole does not claim a hole with a no-ink neighbour", () => {
  expect(scanKernelRules(bitmapOf(["#.#", "#.#", "###"]), kernelRules)).toEqual(
    [],
  );
});

test("verticalSlotHole claims a two-cell-tall hole ringed by ink", () => {
  expect(
    scanKernelRules(bitmapOf(["###", "#.#", "#.#", "###"]), kernelRules),
  ).toEqual([{ rule: verticalSlotHole, x: 1, y: 1 }]);
});

test("a three-cell-tall hole is claimed by neither hole rule", () => {
  expect(
    scanKernelRules(bitmapOf(["###", "#.#", "#.#", "#.#", "###"]), kernelRules),
  ).toEqual([]);
});

test("every cut corner of a box is claimed as a rounded corner", () => {
  // wide and tall enough that no two corners' arcs reach the same cell
  const box = bitmapOf([
    ".#####.",
    "#######",
    "#######",
    "#######",
    "#######",
    "#######",
    ".#####.",
  ]);
  expect(
    scanKernelRules(box, kernelRules).map((m) => [m.rule.name, m.x, m.y]),
  ).toEqual([
    ["roundedCornerTopLeft", 0, 0],
    ["roundedCornerTopRight", 6, 0],
    ["roundedCornerBottomLeft", 0, 6],
    ["roundedCornerBottomRight", 6, 6],
  ]);
});

// the 'o' and '4' glyphs exactly as they appear in gfx/sprites.borders.png
const oGlyph = [
  "........",
  "........",
  ".#####..",
  "#######.",
  "###.###.",
  "#######.",
  "#######.",
  ".#####..",
  "........",
  "........",
];
const fourGlyph = [
  "###.....",
  "###.##..",
  "###.##..",
  "###.##..",
  "#######.",
  "#######.",
  "#######.",
  "....##..",
];
const commaGlyph = [
  "....",
  "....",
  "....",
  "....",
  "....",
  "....",
  "###.",
  "###.",
  ".##.",
  "##..",
];
const hashGlyph = [
  ".##.##..",
  "#######.",
  "#######.",
  ".##.##..",
  "#######.",
  "#######.",
  ".##.##..",
  "........",
];

test("all four corners of an 'o' are rounded", () => {
  expect(
    scanKernelRules(bitmapOf(oGlyph), kernelRules)
      .filter((m) => m.rule.action.type === "roundedCorner")
      .map((m) => [m.rule.name, m.x, m.y]),
  ).toEqual([
    ["roundedCornerTopLeft", 0, 2],
    ["roundedCornerTopRight", 6, 2],
    ["roundedCornerBottomLeft", 0, 7],
    ["roundedCornerBottomRight", 6, 7],
  ]);
});

test("the tail of a ',' is rounded", () => {
  expect(
    scanKernelRules(bitmapOf(commaGlyph), kernelRulesForChar(","))
      .filter((m) => m.rule.action.type === "roundedCorner")
      .map((m) => [m.rule.name, m.x, m.y]),
  ).toEqual([["roundedCornerBottomRight", 2, 9]]);
});

test("the end of a '4' crossbar is not rounded", () => {
  // its edges are the same length as the ',' tail's in every direction, so no
  // pattern can tell them apart - the '4' opts out of the rule instead
  expect(
    scanKernelRules(bitmapOf(fourGlyph), kernelRulesForChar("4")).filter(
      (m) => m.rule.action.type === "roundedCorner",
    ),
  ).toEqual([]);
});

test("a '#' keeps all four of its corners square", () => {
  expect(
    scanKernelRules(bitmapOf(hashGlyph), kernelRulesForChar("#")).filter(
      (m) => m.rule.action.type === "roundedCorner",
    ),
  ).toEqual([]);
});

test("a character with no opt-out keeps every rule", () => {
  expect(kernelRulesForChar("o")).toEqual(kernelRules);
});

test("two corners sharing a cell both round, as on the short left edge of a 'g'", () => {
  // the arcs reach into opposite ends of the middle cell without meeting, so
  // reaching the same cell must not refuse the second corner
  const gGlyph = [
    "........",
    "........",
    ".#####..",
    "#######.",
    "###.###.",
    "#######.",
    ".######.",
    "....###.",
    ".######.",
    ".#####..",
  ];
  expect(
    scanKernelRules(bitmapOf(gGlyph), kernelRulesForChar("g"))
      .filter((m) => m.rule.action.type === "roundedCorner")
      .map((m) => [m.rule.name, m.x, m.y]),
  ).toEqual([
    ["roundedCornerTopLeft", 0, 2],
    ["roundedCornerTopRight", 6, 2],
    ["roundedCornerBottomLeft", 0, 6],
    ["roundedCornerBottomRight", 6, 9],
  ]);
});

test("a stem meeting a bowl is not a rounded corner", () => {
  // as in a 'b' or 'h': the empty cell has ink to its left and below it, but
  // the stem carries on above, so those edges are not the outside of a box
  expect(
    scanKernelRules(
      bitmapOf(["##..", "##..", "####", "####", "####"]),
      kernelRules,
    ),
  ).toEqual([]);
});

test("a '?' cell matches whether or not there is ink", () => {
  const anyCentre: KernelRule = {
    name: "anyCentre",
    pattern: ["?"],
    activeSite: [[0, 0]],
    action: { type: "circleHole" },
  };
  expect(scanKernelRules(bitmapOf(["#."]), [anyCentre])).toEqual([
    { rule: anyCentre, x: 0, y: 0 },
    { rule: anyCentre, x: 1, y: 0 },
  ]);
});

test("a multi-cell active site claims every cell it covers", () => {
  // a two-cell-tall site, so the second match would start inside the first
  const pairRule: KernelRule = {
    name: "pair",
    pattern: ["#", "#"],
    activeSite: [
      [0, 0],
      [0, 1],
    ],
    action: { type: "circleHole" },
  };
  expect(scanKernelRules(bitmapOf(["#", "#", "#"]), [pairRule])).toEqual([
    { rule: pairRule, x: 0, y: 0 },
  ]);
});

test("an earlier rule claims cells before a later rule is considered", () => {
  const single: KernelRule = {
    name: "single",
    pattern: ["#"],
    activeSite: [[0, 0]],
    action: { type: "circleHole" },
  };
  const pair: KernelRule = {
    name: "pair",
    pattern: ["##"],
    activeSite: [
      [0, 0],
      [1, 0],
    ],
    action: { type: "circleHole" },
  };
  expect(scanKernelRules(bitmapOf(["##"]), [pair, single])).toEqual([
    { rule: pair, x: 0, y: 0 },
  ]);
});
