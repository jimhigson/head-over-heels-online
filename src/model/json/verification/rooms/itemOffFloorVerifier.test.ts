import { expect, test } from "vitest";

import { addItem, campaignOf, newRoom, runCheck } from "../testUtils";
import { itemOffFloorVerifier } from "./itemOffFloorVerifier";

test("flags an item off the edge of the floor", () => {
  const roomA = newRoom("roomA");
  const itemId = addItem(roomA, "block", {
    type: "block",
    position: { x: 3, y: 8, z: 0 },
    config: { style: "organic" },
  });

  const [issue] = runCheck(itemOffFloorVerifier, campaignOf({ roomA }));

  expect({ severity: issue.severity, itemId: issue.itemId }).toEqual({
    severity: "error",
    itemId,
  });
});

test("accepts an item off the floor at or above the room's height, since it is above the room", () => {
  const roomA = newRoom("roomA");
  roomA.height = 13;
  addItem(roomA, "block", {
    type: "block",
    position: { x: 3, y: 8, z: 13 },
    config: { style: "organic" },
  });

  expect(runCheck(itemOffFloorVerifier, campaignOf({ roomA }))).toEqual([]);
});

test("flags an item whose times take one of its copies off the floor", () => {
  const roomA = newRoom("roomA");
  // copies at x=6, 7 and 8, the last off the 8-wide floor:
  const itemId = addItem(roomA, "block", {
    type: "block",
    position: { x: 6, y: 3, z: 0 },
    config: { style: "organic", times: { x: 3 } },
  });

  const [issue] = runCheck(itemOffFloorVerifier, campaignOf({ roomA }));

  expect(issue.itemId).toEqual(itemId);
});

test("accepts an item part-way into a doorway, partly over the floor", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "block", {
    type: "block",
    position: { x: 7.625, y: 3, z: 0 },
    config: { style: "organic" },
  });

  expect(runCheck(itemOffFloorVerifier, campaignOf({ roomA }))).toEqual([]);
});

test("accepts items over the floor, and the room's own structure", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "block", {
    type: "block",
    position: { x: 3, y: 3, z: 0 },
    config: { style: "organic", times: { x: 5 } },
  });

  expect(runCheck(itemOffFloorVerifier, campaignOf({ roomA }))).toEqual([]);
});
