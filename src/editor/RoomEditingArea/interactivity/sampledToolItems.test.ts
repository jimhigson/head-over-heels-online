import { expect, test } from "vitest";

import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJsonItems,
} from "../../editorTypes";
import { toolItemMatchers } from "./__test__/toolItemMatchers";
import { sampledToolItems } from "./sampledToolItems";

expect.extend(toolItemMatchers);

const roomItems: EditorRoomJsonItems = {
  ["blockA" as EditorRoomItemId]: {
    type: "block",
    config: { style: "organic" },
    position: { x: 2, y: 3, z: 0 },
  },
  ["blockB" as EditorRoomItemId]: {
    type: "block",
    config: { style: "artificial" },
    position: { x: 5, y: 3, z: 1 },
  },
  ["door" as EditorRoomItemId]: {
    type: "door",
    config: { direction: "away", toRoom: "somewhere" as EditorRoomId },
    position: { x: 0, y: 0, z: 0 },
  },
  ["otherDoor" as EditorRoomItemId]: {
    type: "door",
    config: { direction: "left", toRoom: "elsewhere" as EditorRoomId },
    position: { x: 4, y: 0, z: 0 },
  },
};

test("clicking an item that isn't selected takes only that item, at the origin", () => {
  expect(
    sampledToolItems(
      "blockA" as EditorRoomItemId,
      ["blockB" as EditorRoomItemId],
      roomItems,
    ),
  ).toEqualToolItems([
    {
      type: "block",
      config: { style: "organic" },
    },
  ]);
});

test("clicking the only selected item takes only that item", () => {
  expect(
    sampledToolItems(
      "blockA" as EditorRoomItemId,
      ["blockA" as EditorRoomItemId],
      roomItems,
    ),
  ).toEqualToolItems([
    {
      type: "block",
      config: { style: "organic" },
    },
  ]);
});

test("clicking one of several selected items takes them all, clicked first, each relative to it", () => {
  expect(
    sampledToolItems(
      "blockB" as EditorRoomItemId,
      ["blockA" as EditorRoomItemId, "blockB" as EditorRoomItemId],
      roomItems,
    ),
  ).toEqualToolItems([
    {
      type: "block",
      config: { style: "artificial" },
    },
    {
      type: "block",
      config: { style: "organic" },
      position: { x: -3, y: 0, z: -1 },
    },
  ]);
});

test("doors in a selection of several are left out", () => {
  expect(
    sampledToolItems(
      "blockA" as EditorRoomItemId,
      [
        "blockA" as EditorRoomItemId,
        "door" as EditorRoomItemId,
        "blockB" as EditorRoomItemId,
      ],
      roomItems,
    ).map(({ type }) => type),
  ).toEqual(["block", "block"]);
});

test("a door that is clicked alone is taken", () => {
  expect(
    sampledToolItems("door" as EditorRoomItemId, [], roomItems).map(
      ({ type }) => type,
    ),
  ).toEqual(["door"]);
});

test("a selection of nothing but doors takes the one clicked", () => {
  expect(
    sampledToolItems(
      "door" as EditorRoomItemId,
      ["door" as EditorRoomItemId, "otherDoor" as EditorRoomItemId],
      roomItems,
    ).map(({ type }) => type),
  ).toEqual(["door"]);
});
