import { expect, test } from "vitest";

import { addItem, campaignOf, newRoom, runCheck } from "../testUtils";
import { solidItemsOverlapVerifier } from "./solidItemsOverlapVerifier";

test("flags two blocks in the same place, naming both", () => {
  const roomA = newRoom("roomA");
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
      msg: "two *block* items in ‘roomA’: ‘block1’ and ‘block2’ overlap",
    },
  ]);
});

test("describes overlapping items of different types by both their types", () => {
  const roomA = newRoom("roomA");
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
    "a *block* and a *spring* item in ‘roomA’: ‘block1’ and ‘spring1’ overlap",
  );
});

test("accepts a block standing on another, since they only touch", () => {
  const roomA = newRoom("roomA");
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
  const roomA = newRoom("roomA");

  expect(runCheck(solidItemsOverlapVerifier, campaignOf({ roomA }))).toEqual(
    [],
  );
});
