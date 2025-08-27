import { describe, expect, test } from "vitest";

import type { ItemInPlayType } from "../../model/ItemInPlay";
import type { SortableObstacle } from "./collisionsOrder";

import { unitVectors } from "../../utils/vectors/unitVectors";
import { sortObstaclesAboutPriorityAndVector } from "./collisionsOrder";

const lowBlock = {
  type: "block" as ItemInPlayType,
  id: "lowBlock",
  state: { position: { x: 1, y: 0, z: 0 } },
  aabb: { x: 1, y: 1, z: 1 },
};
const blockTower = [
  {
    type: "block" as ItemInPlayType,
    id: "topBlock",
    state: { position: { x: 0, y: 0, z: 2 } },
    aabb: { x: 1, y: 1, z: 1 },
  },
  {
    type: "block" as ItemInPlayType,
    id: "midBlock",
    state: { position: { x: 1, y: 0, z: 1 } },
    aabb: { x: 1, y: 1, z: 1 },
  },
  lowBlock,
];

describe("sort order of items with same type", () => {
  test("can sort obstacles about downwards vector", () => {
    const result = sortObstaclesAboutPriorityAndVector(
      unitVectors.down,
      blockTower,
    );

    expect(result.map((r) => r.id)).toEqual([
      "topBlock",
      "midBlock",
      "lowBlock",
    ]);
  });

  test("can sort obstacles about downwards vector (reversed input)", () => {
    const result = sortObstaclesAboutPriorityAndVector(
      unitVectors.down,
      // if sort is working properly, reversing the input should not matter
      blockTower.toReversed(),
    );

    expect(result.map((r) => r.id)).toEqual([
      "topBlock",
      "midBlock",
      "lowBlock",
    ]);
  });

  test("can sort obstacles about downwards vector", () => {
    const result = sortObstaclesAboutPriorityAndVector(
      unitVectors.up,
      blockTower,
    );

    expect(result.map((r) => r.id)).toEqual([
      "lowBlock",
      "midBlock",
      "topBlock",
    ]);
  });

  test("can sort obstacles about downwards vector (reversed input)", () => {
    const result = sortObstaclesAboutPriorityAndVector(
      unitVectors.up,
      // if sort is working properly, reversing the input should not matter
      blockTower.toReversed(),
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
      state: { position: { x: 0, y: 0, z: 0 } }, // next to the low block
      aabb: { x: 1, y: 1, z: 1 },
    },
  ];

  test("blocks come before monsters", () => {
    const result = sortObstaclesAboutPriorityAndVector(
      unitVectors.down,
      // if sort is working properly, reversing the input should not matter
      monsterAndBlock,
    );
    expect(result.map((r) => r.id)).toEqual(["lowBlock", "monster"]);
  });
  test("blocks come before monsters (reversed input)", () => {
    const result = sortObstaclesAboutPriorityAndVector(
      unitVectors.down,
      // if sort is working properly, reversing the input should not matter
      monsterAndBlock.toReversed(),
    );
    expect(result.map((r) => r.id)).toEqual(["lowBlock", "monster"]);
  });
});
