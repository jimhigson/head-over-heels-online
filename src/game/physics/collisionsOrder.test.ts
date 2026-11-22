import { describe, expect, test } from "vitest";

import type { ItemInPlayType } from "../../model/ItemInPlay";
import { unitVectors } from "../../utils/vectors/unitVectors";
import {
  type SortableObstacle,
  sortObstaclesAboutPriorityAndVectorInPlace,
} from "./collisionsOrder";

/**
 * overlaps none of the obstacles, so only their contact order decides
 */
const subjectBoxOverlappingNothing = {
  x: 100,
  y: 100,
  z: 100,
  xd: 1,
  yd: 1,
  zd: 1,
};

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
      subjectBoxOverlappingNothing,
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
      subjectBoxOverlappingNothing,
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
      subjectBoxOverlappingNothing,
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
      subjectBoxOverlappingNothing,
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
      subjectBoxOverlappingNothing,
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
      subjectBoxOverlappingNothing,
      result,
      0,
      result.length,
    );
    expect(result.map((r) => r.id)).toEqual(["lowBlock", "monster"]);
  });
});

test("sorts only the obstacles in the range", () => {
  const result = [...blockTower, ...blockTower];
  sortObstaclesAboutPriorityAndVectorInPlace(
    unitVectors.up,
    subjectBoxOverlappingNothing,
    result,
    3,
    6,
  );

  expect(result.map((r) => r.id)).toEqual([
    "topBlock",
    "midBlock",
    "lowBlock",
    "lowBlock",
    "midBlock",
    "topBlock",
  ]);
});

test("the most-overlapped obstacle comes first, even if met later along the vector", () => {
  // a seam between two blocks in a row, walked along diagonally:
  const trailingBlock: SortableObstacle = {
    type: "pushableBlock",
    id: "trailingBlock",
    state: { box: { x: 48, y: 112, z: 0, xd: 16, yd: 16, zd: 12 } },
  };
  const alongsideBlock: SortableObstacle = {
    type: "pushableBlock",
    id: "alongsideBlock",
    state: { box: { x: 64, y: 112, z: 0, xd: 16, yd: 16, zd: 12 } },
  };
  const result = [trailingBlock, alongsideBlock];
  sortObstaclesAboutPriorityAndVectorInPlace(
    { x: 1, y: 1, z: 0 },
    // straddling the seam, mostly beside the alongside block:
    { x: 63.75, y: 100.32, z: 0, xd: 12, yd: 12, zd: 12 },
    result,
    0,
    result.length,
  );

  expect(result.map((r) => r.id)).toEqual(["alongsideBlock", "trailingBlock"]);
});
