import { expect, test } from "vitest";

import { isItemToolCurrent } from "./isItemToolCurrent";
import type { ItemToolItem, Tool } from "./Tool";

const organicBlock: ItemToolItem = {
  type: "block",
  config: { style: "organic" },
};
const artificialBlock: ItemToolItem = {
  type: "block",
  config: { style: "artificial" },
};
const lamp: ItemToolItem = {
  type: "lamp",
  config: { direction: "towards" },
};

test("a tool with the one matching item is current", () => {
  expect(
    isItemToolCurrent({ type: "item", items: [organicBlock] }, [organicBlock]),
  ).toBe(true);
});

test("a tool whose item has the origin as its position is current for the same item with no position", () => {
  expect(
    isItemToolCurrent(
      {
        type: "item",
        items: [{ ...organicBlock, position: { x: 0, y: 0, z: 0 } }],
      },
      [organicBlock],
    ),
  ).toBe(true);
});

test("a tool with an item of a different config is not current", () => {
  expect(
    isItemToolCurrent({ type: "item", items: [organicBlock] }, [
      artificialBlock,
    ]),
  ).toBe(false);
});

test("a tool with an item in a different position is not current", () => {
  expect(
    isItemToolCurrent(
      {
        type: "item",
        items: [{ ...organicBlock, position: { x: 1, y: 0, z: 0 } }],
      },
      [organicBlock],
    ),
  ).toBe(false);
});

test("a tool with the same items in a different order is current", () => {
  const items: ItemToolItem[] = [
    { ...organicBlock },
    { ...lamp, position: { x: 2, y: 0, z: 0 } },
  ];
  expect(
    isItemToolCurrent({ type: "item", items: [items[1], items[0]] }, [
      items[0],
      items[1],
    ]),
  ).toBe(true);
});

test("a tool with a repeated item is not current for items that only have it once", () => {
  expect(
    isItemToolCurrent({ type: "item", items: [organicBlock, organicBlock] }, [
      organicBlock,
      artificialBlock,
    ]),
  ).toBe(false);
});

test("a tool with more items than are asked for is not current", () => {
  expect(
    isItemToolCurrent(
      { type: "item", items: [organicBlock, artificialBlock] },
      [organicBlock],
    ),
  ).toBe(false);
});

test.for<Tool>([{ type: "pointer" }, { type: "eyeDropper" }])(
  "the $type tool is not current",
  (tool) => {
    expect(isItemToolCurrent(tool, [organicBlock])).toBe(false);
  },
);
