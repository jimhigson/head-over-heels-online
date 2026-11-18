import { expect, test } from "vitest";

import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../editorTypes";
import { teleporterDefaultLandingItemId } from "./teleporterDefaultLandingItemId";

const teleporter: EditorJsonItemUnion = {
  type: "teleporter",
  config: {},
  position: { x: 0, y: 0, z: 0 },
};

const destinationRoomId = "destination" as EditorRoomId;
const otherRoomId = "other" as EditorRoomId;

const roomWithItems = (
  items: Partial<Record<EditorRoomItemId, EditorJsonItemUnion>>,
): EditorRoomJson =>
  ({
    planet: "blacktooth",
    color: { hue: "cyan", shade: "basic" },
    items,
  }) as EditorRoomJson;

test("lands on a room's only teleporter", () => {
  expect(
    teleporterDefaultLandingItemId(
      destinationRoomId,
      roomWithItems({ ["t" as EditorRoomItemId]: teleporter }),
      otherRoomId,
      [],
    ),
  ).toBe("t");
});

test("has no default in a room of several teleporters", () => {
  expect(
    teleporterDefaultLandingItemId(
      destinationRoomId,
      roomWithItems({
        ["t1" as EditorRoomItemId]: teleporter,
        ["t2" as EditorRoomItemId]: teleporter,
      }),
      otherRoomId,
      [],
    ),
  ).toBeUndefined();
});

test("doesn't count the teleporters being set, when they are in the destination room", () => {
  expect(
    teleporterDefaultLandingItemId(
      destinationRoomId,
      roomWithItems({
        ["t1" as EditorRoomItemId]: teleporter,
        ["t2" as EditorRoomItemId]: teleporter,
      }),
      destinationRoomId,
      ["t1" as EditorRoomItemId],
    ),
  ).toBe("t2");
});

test("counts a destination teleporter sharing an id with one being set in another room", () => {
  expect(
    teleporterDefaultLandingItemId(
      destinationRoomId,
      roomWithItems({
        ["t1" as EditorRoomItemId]: teleporter,
        ["t2" as EditorRoomItemId]: teleporter,
      }),
      otherRoomId,
      ["t1" as EditorRoomItemId],
    ),
  ).toBeUndefined();
});

test("has no default in a room without teleporters", () => {
  expect(
    teleporterDefaultLandingItemId(
      destinationRoomId,
      roomWithItems({}),
      otherRoomId,
      [],
    ),
  ).toBeUndefined();
});
