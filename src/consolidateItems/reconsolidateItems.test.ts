import { expect, test } from "vitest";

import { type JsonItemUnion } from "../model/json/JsonItem";
import { getJsonItemTimes } from "../model/times";
import { reconsolidateItems } from "./reconsolidateItems";
import { makeToasterConsolidationPredicate } from "./toasterConsolidationPredicate";

const itemMass = (
  items: Record<string, JsonItemUnion>,
  type: JsonItemUnion["type"],
) =>
  Object.values(items)
    .filter((item) => item.type === type)
    .reduce((sum, item) => {
      const { x, y, z } = getJsonItemTimes(item);
      return sum + x * y * z;
    }, 0);

const itemCells = (
  items: Record<string, JsonItemUnion>,
  type: JsonItemUnion["type"],
): Set<string> => {
  const cells = new Set<string>();
  for (const item of Object.values(items)) {
    if (item.type !== type) {
      continue;
    }
    const times = getJsonItemTimes(item);
    const { x, y, z } = item.position;
    for (let dx = 0; dx < times.x; dx++) {
      for (let dy = 0; dy < times.y; dy++) {
        for (let dz = 0; dz < times.z; dz++) {
          cells.add(`${x + dx},${y + dy},${z + dz}`);
        }
      }
    }
  }
  return cells;
};

const sleepingCyberman = (x: number, y: number) =>
  ({
    type: "monster",
    config: {
      which: "cyberman",
      activated: "after-player-near",
      movement: "towards-on-shortest-axis-xy4",
      startDirection: "left",
    },
    position: { x, y, z: 1 },
  }) satisfies JsonItemUnion;

test("reconsolidating toaster blocks with colliding ids conserves total block mass", () => {
  // both blocks sit under a sleeping monster so the toaster predicate de-consolidates
  // them, which explodes each into 1x1 fragments and recombines. explodeItem names
  // fragments `${id}_${suffix}`, so exploding the block id "deadlyBlock" emits a
  // "deadlyBlock_1" fragment that collides with the sibling block "deadlyBlock_1" -
  // the recombined pieces clobber each other and cells are destroyed.
  const items = {
    deadlyBlock_1: {
      type: "deadlyBlock",
      config: { style: "toaster", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
    },
    deadlyBlock: {
      type: "deadlyBlock",
      config: { style: "toaster", times: { y: 2 } },
      position: { x: 5, y: 0, z: 0 },
    },
    sleeper1: sleepingCyberman(0, 0),
    sleeper2: sleepingCyberman(5, 0),
  } satisfies Record<string, JsonItemUnion>;

  const predicate = makeToasterConsolidationPredicate(items);
  const reconsolidated = reconsolidateItems(items, predicate);

  expect(itemMass(reconsolidated, "deadlyBlock")).toBe(
    itemMass(items, "deadlyBlock"),
  );
  expect(itemCells(reconsolidated, "deadlyBlock")).toEqual(
    itemCells(items, "deadlyBlock"),
  );
});

test("reconsolidating standard blocks with colliding ids conserves mass and cells", () => {
  // forcing the explode-and-recombine path (predicate never consolidates) on
  // ids that collide under explodeItem's id scheme: exploding "block" emits a
  // "block_1" fragment that would clobber the sibling block "block_1".
  const items = {
    block_1: {
      type: "block",
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
    },
    block: {
      type: "block",
      config: { style: "organic", times: { y: 2 } },
      position: { x: 5, y: 0, z: 0 },
    },
  } satisfies Record<string, JsonItemUnion>;

  const reconsolidated = reconsolidateItems(items, () => false);

  expect(itemMass(reconsolidated, "block")).toBe(itemMass(items, "block"));
  expect(itemCells(reconsolidated, "block")).toEqual(itemCells(items, "block"));
});
