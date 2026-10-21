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

const roomWithItems = (
  items: Partial<Record<EditorRoomItemId, EditorJsonItemUnion>>,
): EditorRoomJson =>
  ({
    id: "room" as EditorRoomId,
    planet: "blacktooth",
    color: { hue: "cyan", shade: "basic" },
    items,
  }) as EditorRoomJson;

test("lands on a room's only teleporter", () => {
  expect(
    teleporterDefaultLandingItemId(
      roomWithItems({ ["t" as EditorRoomItemId]: teleporter }),
      [],
    ),
  ).toBe("t");
});

test("has no default in a room of several teleporters", () => {
  expect(
    teleporterDefaultLandingItemId(
      roomWithItems({
        ["t1" as EditorRoomItemId]: teleporter,
        ["t2" as EditorRoomItemId]: teleporter,
      }),
      [],
    ),
  ).toBeUndefined();
});

test("doesn't count the teleporters being set", () => {
  expect(
    teleporterDefaultLandingItemId(
      roomWithItems({
        ["t1" as EditorRoomItemId]: teleporter,
        ["t2" as EditorRoomItemId]: teleporter,
      }),
      ["t1" as EditorRoomItemId],
    ),
  ).toBe("t2");
});

test("has no default in a room without teleporters", () => {
  expect(teleporterDefaultLandingItemId(roomWithItems({}), [])).toBeUndefined();
});
