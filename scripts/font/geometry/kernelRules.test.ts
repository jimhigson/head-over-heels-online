import { expect, test } from "vitest";

import { readGlyphOverrides } from "../node/readGlyphOverrides";
import {
  type KernelRule,
  kernelRules,
  kernelRulesForChar,
  scanKernelRules,
} from "./kernelRules";
import { ruleSettingsFor } from "./ruleEnablement";

// read the same way the build reads it, so these test the settings the font
// is actually built from rather than a copy kept in step by hand
const overrides = readGlyphOverrides();

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
    [
      {
        rule: isolatedHole,
        x: 1,
        y: 1,
        choices: { corners: "allRound", scale: "areaPreserving" },
      },
    ],
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
  ).toEqual([
    {
      rule: verticalSlotHole,
      x: 1,
      y: 1,
      choices: { corners: "allRound", scale: "areaPreserving" },
    },
  ]);
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
    scanKernelRules(
      bitmapOf(commaGlyph),
      kernelRulesForChar(","),
      ruleSettingsFor(overrides[","]),
    )
      .filter((m) => m.rule.action.type === "roundedCorner")
      .map((m) => [m.rule.name, m.x, m.y]),
  ).toEqual([["roundedCornerBottomRight", 2, 9]]);
});

test("the end of a '4' crossbar is not rounded", () => {
  // its edges are the same length as the ',' tail's in every direction, so no
  // pattern can tell them apart - the '4' opts out of the rule instead
  expect(
    scanKernelRules(
      bitmapOf(fourGlyph),
      kernelRulesForChar("4"),
      ruleSettingsFor(overrides["4"]),
    ).filter((m) => m.rule.action.type === "roundedCorner"),
  ).toEqual([]);
});

test("a '#' keeps all four of its corners square", () => {
  expect(
    scanKernelRules(
      bitmapOf(hashGlyph),
      kernelRulesForChar("#"),
      ruleSettingsFor(overrides["#"]),
    ).filter((m) => m.rule.action.type === "roundedCorner"),
  ).toEqual([]);
});

// the 'e' and 'q' glyphs exactly as they appear in gfx/sprites.borders.png
const eGlyph = [
  "........",
  "........",
  ".#####..",
  "###.###.",
  "#######.",
  "####....",
  "#######.",
  ".#####..",
  "........",
  "........",
];
const qGlyph = [
  "........",
  "........",
  ".######.",
  "#######.",
  "###.###.",
  "#######.",
  "#######.",
  ".######.",
  "....####",
  "....###.",
];

test("the bottom right of an 'e' rounds where that rule is switched on", () => {
  expect(
    scanKernelRules(
      bitmapOf(eGlyph),
      kernelRulesForChar("e"),
      ruleSettingsFor({
        pixelRules: { "6,7": { waistedCorner: { on: true } } },
      }),
    )
      .filter(
        (m) =>
          m.rule.action.type === "roundedCorner" ||
          m.rule.action.type === "waistedCorner",
      )
      .map((m) => [m.rule.name, m.choices.cut, m.x, m.y]),
  ).toEqual([
    // no mode named, so it takes the first the rule offers
    ["waistedCorner", "round", 6, 7],
    ["roundedCornerTopLeft", undefined, 0, 2],
    ["roundedCornerTopRight", undefined, 6, 2],
    ["roundedCornerBottomLeft", undefined, 0, 7],
  ]);
});

test("the same corner rule left alone fires nowhere", () => {
  expect(
    scanKernelRules(
      bitmapOf(eGlyph),
      kernelRulesForChar("e"),
      ruleSettingsFor(undefined),
    ).filter((m) => m.rule.defaultOff === true),
  ).toEqual([]);
});

test("the outer corner of a 'q' tail is chamfered at 45 degrees", () => {
  expect(
    scanKernelRules(
      bitmapOf(qGlyph),
      kernelRulesForChar("q"),
      ruleSettingsFor({
        pixelRules: {
          "7,9": { waistedCorner: { on: true, options: { cut: "diagonal" } } },
        },
      }),
    )
      .filter((m) => m.rule.action.type === "waistedCorner")
      .map((m) => [m.rule.name, m.choices.cut, m.x, m.y]),
  ).toEqual([["waistedCorner", "diagonal", 7, 9]]);
});

test("point detection applies only to the characters that end in a point", () => {
  expect(kernelRulesForChar("o").map((rule) => rule.name)).not.toContain(
    "taperPoint",
  );
});

test("a character may be told to sit out a rule it would otherwise match", () => {
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
    scanKernelRules(
      box,
      kernelRulesForChar("o"),
      ruleSettingsFor({ disabledRules: ["roundedCornerTopLeft"] }),
    ).map((m) => m.rule.name),
  ).toEqual([
    "roundedCornerTopRight",
    "roundedCornerBottomLeft",
    "roundedCornerBottomRight",
  ]);
});

test("a pixel switched off blocks every match whose active site reaches it", () => {
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
    scanKernelRules(
      box,
      kernelRulesForChar("o"),
      ruleSettingsFor({
        pixelRules: { "0,0": { roundedCornerTopLeft: { on: false } } },
      }),
    ).map((m) => m.rule.name),
  ).toEqual([
    "roundedCornerTopRight",
    "roundedCornerBottomLeft",
    "roundedCornerBottomRight",
  ]);
});

test("a pixel switched off wins over the same pixel being switched on", () => {
  const eOn = {
    pixelRules: {
      "6,7": { waistedCorner: { on: true } },
    },
  };
  const alsoOff = {
    pixelRules: {
      "6,7": { waistedCorner: { on: false } },
    },
  };
  expect(
    scanKernelRules(
      bitmapOf(eGlyph),
      kernelRulesForChar("e"),
      ruleSettingsFor({ ...eOn, ...alsoOff }),
    ).filter((m) => m.rule.defaultOff === true),
  ).toEqual([]);
});

test("two staircases converging on a point each take their own side of the tip cell", () => {
  // as at the bottom of a shield: the left and right 45 degree edges share
  // the single tip cell, one redrawing its left side and one its right
  const point = bitmapOf(["#####", "#####", ".###.", "..#.."]);
  expect(
    scanKernelRules(point, kernelRules)
      .filter((m) => m.rule.action.type === "diagonalEdge")
      .map((m) => [m.rule.name, m.x, m.y]),
  ).toEqual([
    ["staircase1to1InkRightStepRightmiddle", 1, 2],
    ["staircase1to1InkRightStepRightend", 2, 3],
    ["staircase1to1InkLeftStepLeftmiddle", 3, 2],
    ["staircase1to1InkLeftStepLeftend", 2, 3],
  ]);
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
    scanKernelRules(
      bitmapOf(gGlyph),
      kernelRulesForChar("g"),
      ruleSettingsFor(undefined),
    )
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
    action: { type: "hole", cellsWide: 1, cellsTall: 1 },
  };
  expect(scanKernelRules(bitmapOf(["#."]), [anyCentre])).toEqual([
    { rule: anyCentre, x: 0, y: 0, choices: {} },
    { rule: anyCentre, x: 1, y: 0, choices: {} },
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
    action: { type: "hole", cellsWide: 1, cellsTall: 1 },
  };
  expect(scanKernelRules(bitmapOf(["#", "#", "#"]), [pairRule])).toEqual([
    { rule: pairRule, x: 0, y: 0, choices: {} },
  ]);
});

test("an earlier rule claims cells before a later rule is considered", () => {
  const single: KernelRule = {
    name: "single",
    pattern: ["#"],
    activeSite: [[0, 0]],
    action: { type: "hole", cellsWide: 1, cellsTall: 1 },
  };
  const pair: KernelRule = {
    name: "pair",
    pattern: ["##"],
    activeSite: [
      [0, 0],
      [1, 0],
    ],
    action: { type: "hole", cellsWide: 1, cellsTall: 1 },
  };
  expect(scanKernelRules(bitmapOf(["##"]), [pair, single])).toEqual([
    { rule: pair, x: 0, y: 0, choices: {} },
  ]);
});
