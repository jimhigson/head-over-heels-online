import { describe, expect, test } from "vitest";

import type { ItemInPlayType } from "../../model/ItemInPlay";
import { unitVectors } from "../../utils/vectors/unitVectors";
import {
  type SortableObstacle,
  sortObstaclesAboutPriorityAndVectorInPlace,
} from "./collisionsOrder";

const lowBlock = {
  type: "block" as ItemInPlayType,
  id: "lowBlock",
  state: { box: { x: 1, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
};
const blockTower = [
  {
    type: "block" as ItemInPlayType,
    id: "topBlock",
    state: { box: { x: 0, y: 0, z: 2, xd: 1, yd: 1, zd: 1 } },
  },
  {
    type: "block" as ItemInPlayType,
    id: "midBlock",
    state: { box: { x: 1, y: 0, z: 1, xd: 1, yd: 1, zd: 1 } },
  },
  lowBlock,
];

describe("sort order of items with same type", () => {
  test("can sort obstacles about downwards vector", () => {
    const result = blockTower.slice();
    sortObstaclesAboutPriorityAndVectorInPlace(
      unitVectors.down,
      result,
      0,
      result.length,
    );

    expect(result.map((r) => r.id)).toEqual([
      "topBlock",
      "midBlock",
      "lowBlock",
    ]);
  });

  test("can sort obstacles about downwards vector (reversed input)", () => {
    // if sort is working properly, reversing the input should not matter
    const result = blockTower.toReversed();
    sortObstaclesAboutPriorityAndVectorInPlace(
      unitVectors.down,
      result,
      0,
      result.length,
    );

    expect(result.map((r) => r.id)).toEqual([
      "topBlock",
      "midBlock",
      "lowBlock",
    ]);
  });

  test("can sort obstacles about downwards vector", () => {
    const result = blockTower.slice();
    sortObstaclesAboutPriorityAndVectorInPlace(
      unitVectors.up,
      result,
      0,
      result.length,
    );

    expect(result.map((r) => r.id)).toEqual([
      "lowBlock",
      "midBlock",
      "topBlock",
    ]);
  });

  test("can sort obstacles about downwards vector (reversed input)", () => {
    // if sort is working properly, reversing the input should not matter
    const result = blockTower.toReversed();
    sortObstaclesAboutPriorityAndVectorInPlace(
      unitVectors.up,
      result,
      0,
      result.length,
    );
    expect(result.map((r) => r.id)).toEqual([
      "lowBlock",
      "midBlock",
      "topBlock",
    ]);
  });
});

describe("blocks protext from monsters by colliding first", () => {
  const monsterAndBlock: SortableObstacle[] = [
    lowBlock,
    {
      type: "monster",
      id: "monster",
      state: { box: { x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } }, // next to the low block
    },
  ];

  test("blocks come before monsters", () => {
    // if sort is working properly, reversing the input should not matter
    const result = monsterAndBlock.slice();
    sortObstaclesAboutPriorityAndVectorInPlace(
      unitVectors.down,
      result,
      0,
      result.length,
    );
    expect(result.map((r) => r.id)).toEqual(["lowBlock", "monster"]);
  });
  test("blocks come before monsters (reversed input)", () => {
    // if sort is working properly, reversing the input should not matter
    const result = monsterAndBlock.toReversed();
    sortObstaclesAboutPriorityAndVectorInPlace(
      unitVectors.down,
      result,
      0,
      result.length,
    );
    expect(result.map((r) => r.id)).toEqual(["lowBlock", "monster"]);
  });
});

test("sorts only the obstacles in the range", () => {
  const result = [...blockTower, ...blockTower];
  sortObstaclesAboutPriorityAndVectorInPlace(unitVectors.up, result, 3, 6);

  expect(result.map((r) => r.id)).toEqual([
    "topBlock",
    "midBlock",
    "lowBlock",
    "lowBlock",
    "midBlock",
    "topBlock",
  ]);
});
