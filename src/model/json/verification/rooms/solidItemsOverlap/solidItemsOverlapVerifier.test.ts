import { expect, test } from "vitest";

import { addItem, campaignOf, newRoom, runCheck } from "../../testUtils";
import { solidItemsOverlapVerifier } from "./solidItemsOverlapVerifier";

test("flags two blocks in the same place, naming both", () => {
  const roomA = newRoom();
  addItem(roomA, "block1", {
    type: "block",
    position: { x: 3, y: 3, z: 0 },
    config: { style: "organic" },
  });
  addItem(roomA, "block2", {
    type: "block",
    position: { x: 3, y: 3, z: 0 },
    config: { style: "artificial" },
  });

  const issues = runCheck(solidItemsOverlapVerifier, campaignOf({ roomA }));

  expect(
    issues.map(({ severity, itemIds, msg }) => ({ severity, itemIds, msg })),
  ).toEqual([
    {
      severity: "error",
      itemIds: ["block1", "block2"],
      msg: "two *block* items in ‘*roomA*’: ‘**block1**’ and ‘**block2**’ overlap",
    },
  ]);
});

test("describes overlapping items of different types by both their types", () => {
  const roomA = newRoom();
  addItem(roomA, "block1", {
    type: "block",
    position: { x: 3, y: 3, z: 0 },
    config: { style: "organic" },
  });
  addItem(roomA, "spring1", {
    type: "spring",
    position: { x: 3, y: 3, z: 0 },
    config: {},
  });

  const [issue] = runCheck(solidItemsOverlapVerifier, campaignOf({ roomA }));

  expect(issue.msg).toBe(
    "a *block* and a *spring* item in ‘*roomA*’: ‘**block1**’ and ‘**spring1**’ overlap",
  );
});

test("accepts a block standing on another, since they only touch", () => {
  const roomA = newRoom();
  addItem(roomA, "block1", {
    type: "block",
    position: { x: 3, y: 3, z: 0 },
    config: { style: "organic" },
  });
  addItem(roomA, "block2", {
    type: "block",
    position: { x: 3, y: 3, z: 1 },
    config: { style: "organic" },
  });

  expect(runCheck(solidItemsOverlapVerifier, campaignOf({ roomA }))).toEqual(
    [],
  );
});

test("accepts a room with nothing overlapping", () => {
  const roomA = newRoom();

  expect(runCheck(solidItemsOverlapVerifier, campaignOf({ roomA }))).toEqual(
    [],
  );
});

test("accepts two walls meeting at an inside corner, both ending in the corner block", () => {
  const roomA = newRoom();
  addItem(roomA, "awayWall", {
    type: "wall",
    position: { x: 3, y: 3, z: 0 },
    config: { direction: "away", tiles: ["plain", "plain", "plain"] },
  });
  addItem(roomA, "leftWall", {
    type: "wall",
    position: { x: 3, y: 3, z: 0 },
    config: { direction: "left", tiles: ["plain", "plain", "plain"] },
  });

  expect(runCheck(solidItemsOverlapVerifier, campaignOf({ roomA }))).toEqual(
    [],
  );
});

test("flags a wall ending against the middle of another", () => {
  const roomA = newRoom();
  addItem(roomA, "awayWall", {
    type: "wall",
    position: { x: 1, y: 6, z: 0 },
    config: { direction: "away", tiles: ["plain", "plain", "plain", "plain"] },
  });
  // runs from y 3 to the far side of the away wall, ending inside it at x 3:
  addItem(roomA, "leftWall", {
    type: "wall",
    position: { x: 3, y: 3, z: 0 },
    config: {
      direction: "left",
      tiles: ["plain", "plain", "plain", "plain"],
    },
  });

  const issues = runCheck(solidItemsOverlapVerifier, campaignOf({ roomA }));

  expect(issues.map(({ itemIds }) => itemIds)).toEqual([
    ["awayWall", "leftWall"],
  ]);
});

test("flags two walls crossing in the middle of both", () => {
  const roomA = newRoom();
  addItem(roomA, "awayWall", {
    type: "wall",
    position: { x: 1, y: 4, z: 0 },
    config: { direction: "away", tiles: ["plain", "plain", "plain", "plain"] },
  });
  addItem(roomA, "leftWall", {
    type: "wall",
    position: { x: 3, y: 2, z: 0 },
    config: {
      direction: "left",
      tiles: ["plain", "plain", "plain", "plain"],
    },
  });

  const issues = runCheck(solidItemsOverlapVerifier, campaignOf({ roomA }));

  expect(issues.map(({ itemIds }) => itemIds)).toEqual([
    ["awayWall", "leftWall"],
  ]);
});

test("flags two parallel walls along the same line, overlapping", () => {
  const roomA = newRoom();
  addItem(roomA, "awayWall1", {
    type: "wall",
    position: { x: 1, y: 4, z: 0 },
    config: { direction: "away", tiles: ["plain", "plain", "plain"] },
  });
  addItem(roomA, "awayWall2", {
    type: "wall",
    position: { x: 2, y: 4, z: 0 },
    config: { direction: "away", tiles: ["plain", "plain", "plain"] },
  });

  const issues = runCheck(solidItemsOverlapVerifier, campaignOf({ roomA }));

  expect(issues.map(({ itemIds }) => itemIds)).toEqual([
    ["awayWall1", "awayWall2"],
  ]);
});

test("flags a block inside a wall", () => {
  const roomA = newRoom();
  addItem(roomA, "awayWall", {
    type: "wall",
    position: { x: 3, y: 3, z: 0 },
    config: { direction: "away", tiles: ["plain", "plain"] },
  });
  addItem(roomA, "block", {
    type: "block",
    position: { x: 3, y: 3, z: 2 },
    config: { style: "organic" },
  });

  const issues = runCheck(solidItemsOverlapVerifier, campaignOf({ roomA }));

  expect(issues.map(({ itemIds }) => itemIds)).toEqual([["awayWall", "block"]]);
});

test("accepts a block above a wall, over the top of the room", () => {
  const roomA = newRoom();
  addItem(roomA, "awayWall", {
    type: "wall",
    position: { x: 3, y: 3, z: 0 },
    config: { direction: "away", tiles: ["plain", "plain"] },
  });
  // the room is the default 10 blocks high:
  addItem(roomA, "block", {
    type: "block",
    position: { x: 3, y: 3, z: 10 },
    config: { style: "organic" },
  });

  expect(runCheck(solidItemsOverlapVerifier, campaignOf({ roomA }))).toEqual(
    [],
  );
});
