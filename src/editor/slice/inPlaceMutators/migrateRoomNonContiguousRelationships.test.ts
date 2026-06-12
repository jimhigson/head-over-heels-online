import { expect, test } from "vitest";

import {
  isWholeRoomSubRooms,
  roomNonContiguousRelationship,
} from "../../../model/RoomJson";
import {
  type EditorCampaign,
  type EditorRoomId,
  type EditorRoomJson,
} from "../../editorTypes";
import { migrateRoomNonContiguousRelationships } from "./migrateRoomNonContiguousRelationships";

const campaignOf = (rooms: Record<string, EditorRoomJson>): EditorCampaign => ({
  locator: { campaignName: "test", userId: "test", version: 0 },
  rooms: rooms as EditorCampaign["rooms"],
});

const baseRoom = {
  planet: "blacktooth" as const,
  color: { hue: "cyan", shade: "basic" } as const,
  items: {},
};

const relationship = {
  with: { room: "room_1" as EditorRoomId },
  gridOffset: { x: 2, y: 4, z: 0 },
};

const deepFreeze = <T>(value: T): T => {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const key of Object.keys(value)) {
      deepFreeze((value as Record<string, unknown>)[key]);
    }
  }
  return value;
};

test("undivided room: room-level relationship moves to the whole-room ('*') cell", () => {
  const result = migrateRoomNonContiguousRelationships(
    campaignOf({
      room_0: {
        ...baseRoom,
        id: "room_0" as EditorRoomId,
        meta: { nonContiguousRelationship: relationship },
      } as unknown as EditorRoomJson,
    }),
  );

  const room = result.rooms["room_0" as EditorRoomId];
  expect<boolean>(isWholeRoomSubRooms(room.meta!.subRooms!)).toBe(true);
  expect(roomNonContiguousRelationship(room)).toEqual(relationship);
});

test("undivided room: the legacy room-level field is gone in the result", () => {
  const result = migrateRoomNonContiguousRelationships(
    campaignOf({
      room_0: {
        ...baseRoom,
        id: "room_0" as EditorRoomId,
        meta: { nonContiguousRelationship: relationship },
      } as unknown as EditorRoomJson,
    }),
  );

  expect(result.rooms["room_0" as EditorRoomId].meta).not.toHaveProperty(
    "nonContiguousRelationship",
  );
});

test("divided room: the relationship lands on the origin (0,0) cell", () => {
  const result = migrateRoomNonContiguousRelationships(
    campaignOf({
      big: {
        ...baseRoom,
        id: "big" as EditorRoomId,
        meta: {
          nonContiguousRelationship: relationship,
          subRooms: {
            "0": {
              gridPosition: { x: 0, y: 0 },
              physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 8 } },
            },
            "1": {
              gridPosition: { x: 1, y: 0 },
              physicalPosition: { from: { x: 8, y: 0 }, to: { x: 16, y: 8 } },
            },
          },
        },
      } as unknown as EditorRoomJson,
    }),
  );

  expect(
    roomNonContiguousRelationship(result.rooms["big" as EditorRoomId], "0"),
  ).toEqual(relationship);
});

test("composes with a vertical link already on the whole-room ('*') cell", () => {
  const result = migrateRoomNonContiguousRelationships(
    campaignOf({
      room_0: {
        ...baseRoom,
        id: "room_0" as EditorRoomId,
        meta: {
          nonContiguousRelationship: relationship,
          subRooms: { "*": { above: { room: "room_2" as EditorRoomId } } },
        },
      } as unknown as EditorRoomJson,
    }),
  );

  const subRooms = result.rooms["room_0" as EditorRoomId].meta!.subRooms!;
  expect(isWholeRoomSubRooms(subRooms) && subRooms["*"].above).toEqual({
    room: "room_2",
  });
  expect(
    roomNonContiguousRelationship(result.rooms["room_0" as EditorRoomId]),
  ).toEqual(relationship);
});

test("idempotent: a campaign already in the new format is returned unchanged", () => {
  const campaign = campaignOf({
    room_0: {
      ...baseRoom,
      id: "room_0" as EditorRoomId,
      meta: { subRooms: { "*": { nonContiguousRelationship: relationship } } },
    } as EditorRoomJson,
  });

  expect(migrateRoomNonContiguousRelationships(campaign)).toEqual(campaign);
});

test("does not mutate the (possibly frozen) input campaign", () => {
  const campaign = deepFreeze(
    campaignOf({
      room_0: {
        ...baseRoom,
        id: "room_0" as EditorRoomId,
        meta: { nonContiguousRelationship: relationship },
      } as unknown as EditorRoomJson,
    }),
  );

  // mutating a frozen campaign in place would throw - cloning inside avoids it
  expect(() => migrateRoomNonContiguousRelationships(campaign)).not.toThrow();
});
