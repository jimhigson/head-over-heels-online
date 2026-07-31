import { expect, test } from "vitest";

import { type KernelRule, kernelRules, scanKernelRules } from "./kernelRules";

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
  const box = bitmapOf([".####.", "######", "######", "######", ".####."]);
  expect(
    scanKernelRules(box, kernelRules).map((m) => [m.rule.name, m.x, m.y]),
  ).toEqual([
    ["roundedCornerTopLeft", 0, 0],
    ["roundedCornerTopRight", 5, 0],
    ["roundedCornerBottomLeft", 0, 4],
    ["roundedCornerBottomRight", 5, 4],
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
    activeSite: { x: 0, y: 0, w: 1, h: 1 },
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
    activeSite: { x: 0, y: 0, w: 1, h: 2 },
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
    activeSite: { x: 0, y: 0, w: 1, h: 1 },
    action: { type: "circleHole" },
  };
  const pair: KernelRule = {
    name: "pair",
    pattern: ["##"],
    activeSite: { x: 0, y: 0, w: 2, h: 1 },
    action: { type: "circleHole" },
  };
  expect(scanKernelRules(bitmapOf(["##"]), [pair, single])).toEqual([
    { rule: pair, x: 0, y: 0 },
  ]);
});
