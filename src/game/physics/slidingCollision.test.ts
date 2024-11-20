import { unitVectors } from "@/utils/vectors";
import { sortObstaclesAboutVector } from "./slidingCollision";
import { describe, expect, test } from "vitest";

describe("sortObstaclesAboutVector", () => {
  const blockTower = [
    {
      id: "topBlock",
      state: { position: { x: 0, y: 0, z: 2 } },
      aabb: { x: 1, y: 1, z: 1 },
    },
    {
      id: "midBlock",
      state: { position: { x: 1, y: 0, z: 1 } },
      aabb: { x: 1, y: 1, z: 1 },
    },
    {
      id: "lowBlock",
      state: { position: { x: 1, y: 0, z: 0 } },
      aabb: { x: 1, y: 1, z: 1 },
    },
  ];

  test("can sort obstacles about downwards vector", () => {
    const result = sortObstaclesAboutVector(unitVectors.down, blockTower);

    expect(result.map((o) => o.id)).toEqual([
      "topBlock",
      "midBlock",
      "lowBlock",
    ]);
  });

  test("can sort obstacles about downwards vector (reversed input)", () => {
    const result = sortObstaclesAboutVector(
      unitVectors.down,
      // if sort is working properly, reversing the input should not matter
      blockTower.toReversed(),
    );

    expect(result.map((o) => o.id)).toEqual([
      "topBlock",
      "midBlock",
      "lowBlock",
    ]);
  });

  test("can sort obstacles about downwards vector", () => {
    const result = sortObstaclesAboutVector(unitVectors.up, blockTower);

    expect(result.map((o) => o.id)).toEqual([
      "lowBlock",
      "midBlock",
      "topBlock",
    ]);
  });

  test("can sort obstacles about downwards vector (reversed input)", () => {
    const result = sortObstaclesAboutVector(
      unitVectors.up,
      // if sort is working properly, reversing the input should not matter
      blockTower.toReversed(),
    );
    expect(result.map((o) => o.id)).toEqual([
      "lowBlock",
      "midBlock",
      "topBlock",
    ]);
  });
});
