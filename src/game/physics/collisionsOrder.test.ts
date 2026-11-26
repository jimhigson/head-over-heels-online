import { describe, expect, test } from "vitest";

import type { ItemInPlayType } from "../../model/itemInPlay/ItemInPlay";
import {
  type SortableObstacle,
  sortObstaclesAboutPriorityAndOverlapInPlace,
} from "./collisionsOrder";

const lowBlock = {
  type: "block" as ItemInPlayType,
  id: "lowBlock",
  state: { box: { x: 1, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
};

// a seam between two blocks in a row, walked along diagonally. Their ids sort
// the other way to how much they are overlapped, so only overlap can put the
// block beside first:
const blockBehind: SortableObstacle = {
  type: "pushableBlock",
  id: "blockBehind",
  state: { box: { x: 48, y: 112, z: 0, xd: 16, yd: 16, zd: 12 } },
};
const blockBeside: SortableObstacle = {
  type: "pushableBlock",
  id: "blockBeside",
  state: { box: { x: 64, y: 112, z: 0, xd: 16, yd: 16, zd: 12 } },
};
/**
 * straddling the seam, mostly beside the block beside
 */
const subjectBoxAtSeam = { x: 63.75, y: 100.32, z: 0, xd: 12, yd: 12, zd: 12 };

describe("blocks protext from monsters by colliding first", () => {
  const monsterAndBlock: SortableObstacle[] = [
    lowBlock,
    {
      type: "monster",
      id: "monster",
      state: { box: { x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } }, // next to the low block
    },
  ];
  /**
   * across both, but mostly in the monster
   */
  const subjectBoxMostlyInMonster = {
    x: 0.25,
    y: 0,
    z: 0,
    xd: 1,
    yd: 1,
    zd: 1,
  };

  test("blocks come before monsters", () => {
    // if sort is working properly, reversing the input should not matter
    const result = monsterAndBlock.slice();
    sortObstaclesAboutPriorityAndOverlapInPlace(
      subjectBoxMostlyInMonster,
      result,
      0,
      result.length,
    );
    expect(result.map((r) => r.id)).toEqual(["lowBlock", "monster"]);
  });
  test("blocks come before monsters (reversed input)", () => {
    // if sort is working properly, reversing the input should not matter
    const result = monsterAndBlock.toReversed();
    sortObstaclesAboutPriorityAndOverlapInPlace(
      subjectBoxMostlyInMonster,
      result,
      0,
      result.length,
    );
    expect(result.map((r) => r.id)).toEqual(["lowBlock", "monster"]);
  });
});

test("sorts only the obstacles in the range", () => {
  const result = [blockBehind, blockBeside, blockBehind, blockBeside];
  sortObstaclesAboutPriorityAndOverlapInPlace(subjectBoxAtSeam, result, 2, 4);

  expect(result.map((r) => r.id)).toEqual([
    "blockBehind",
    "blockBeside",
    "blockBeside",
    "blockBehind",
  ]);
});

test("the most-overlapped obstacle comes first", () => {
  const result = [blockBehind, blockBeside];
  sortObstaclesAboutPriorityAndOverlapInPlace(
    subjectBoxAtSeam,
    result,
    0,
    result.length,
  );

  expect(result.map((r) => r.id)).toEqual(["blockBeside", "blockBehind"]);
});

test.for([
  { input: "in id order", obstacles: [blockBehind, blockBeside] },
  { input: "reversed", obstacles: [blockBeside, blockBehind] },
])(
  "obstacles overlapped equally come in id order, whatever their order before ($input)",
  ({ obstacles }) => {
    const result = obstacles.slice();
    sortObstaclesAboutPriorityAndOverlapInPlace(
      // exactly across the seam, half on each block:
      { x: 58, y: 100.32, z: 0, xd: 12, yd: 12, zd: 12 },
      result,
      0,
      result.length,
    );

    expect(result.map((r) => r.id)).toEqual(["blockBehind", "blockBeside"]);
  },
);
