import { unitVectors } from "@/utils/vectors/unitVectors";
import type { SortableObstacle } from "./collisionsOrder";
import { sortObstaclesAboutPriorityAndVector } from "./collisionsOrder";
import { describe, expect, test } from "vitest";
import type { ItemInPlayType } from "@/model/ItemInPlay";

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

describe("blocks protext from baddies by colliding first", () => {
  const baddieAndBlock: SortableObstacle[] = [
    lowBlock,
    {
      type: "baddie",
      id: "baddie",
      state: { position: { x: 0, y: 0, z: 0 } }, // next to the low block
      aabb: { x: 1, y: 1, z: 1 },
    },
  ];

  test("blocks come before baddies", () => {
    const result = sortObstaclesAboutPriorityAndVector(
      unitVectors.down,
      // if sort is working properly, reversing the input should not matter
      baddieAndBlock,
    );
    expect(result.map((r) => r.id)).toEqual(["lowBlock", "baddie"]);
  });
  test("blocks come before baddies (reversed input)", () => {
    const result = sortObstaclesAboutPriorityAndVector(
      unitVectors.down,
      // if sort is working properly, reversing the input should not matter
      baddieAndBlock.toReversed(),
    );
    expect(result.map((r) => r.id)).toEqual(["lowBlock", "baddie"]);
  });
});
