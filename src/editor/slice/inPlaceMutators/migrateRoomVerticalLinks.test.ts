import { expect, test } from "vitest";

import { isWholeRoomSubRooms } from "../../../model/RoomJson";
import {
  type EditorCampaign,
  type EditorRoomId,
  type EditorRoomJson,
} from "../../editorTypes";
import { migrateRoomVerticalLinks } from "./migrateRoomVerticalLinks";

const campaignOf = (rooms: Record<string, EditorRoomJson>): EditorCampaign => ({
  locator: { campaignName: "test", userId: "test", version: 0 },
  rooms: rooms as EditorCampaign["rooms"],
});

const baseRoom = {
  planet: "blacktooth" as const,
  color: { hue: "cyan", shade: "basic" } as const,
  items: {},
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

test("undivided room: top-level link moves to the whole-room ('*') sub-room", () => {
  const result = migrateRoomVerticalLinks(
    campaignOf({
      room_0: {
        ...baseRoom,
        id: "room_0" as EditorRoomId,
        roomAbove: "room_1",
      } as unknown as EditorRoomJson,
    }),
  );

  const subRooms = result.rooms["room_0" as EditorRoomId].meta!.subRooms!;
  expect<boolean>(isWholeRoomSubRooms(subRooms)).toBe(true);
  expect(isWholeRoomSubRooms(subRooms) && subRooms["*"].above).toEqual({
    room: "room_1",
  });
});

test("undivided room: the legacy top-level fields are gone in the result", () => {
  const result = migrateRoomVerticalLinks(
    campaignOf({
      room_0: {
        ...baseRoom,
        id: "room_0" as EditorRoomId,
        roomAbove: "room_1",
      } as unknown as EditorRoomJson,
    }),
  );

  expect(result.rooms["room_0" as EditorRoomId]).not.toHaveProperty(
    "roomAbove",
  );
});

test("divided room: the link lands on the origin (0,0) cell", () => {
  const result = migrateRoomVerticalLinks(
    campaignOf({
      big: {
        ...baseRoom,
        id: "big" as EditorRoomId,
        roomBelow: "other",
        meta: {
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

  const subRooms = result.rooms["big" as EditorRoomId].meta!.subRooms!;
  expect(
    isWholeRoomSubRooms(subRooms) ? undefined : subRooms["0"].below,
  ).toEqual({ room: "other" });
});

test("idempotent: a campaign already in the new format is returned unchanged", () => {
  const campaign = campaignOf({
    room_0: {
      ...baseRoom,
      id: "room_0" as EditorRoomId,
      meta: {
        subRooms: { "*": { above: { room: "room_1" as EditorRoomId } } },
      },
    } as EditorRoomJson,
  });

  expect(migrateRoomVerticalLinks(campaign)).toEqual(campaign);
});

test("does not mutate the (possibly frozen) input campaign", () => {
  const campaign = deepFreeze(
    campaignOf({
      room_0: {
        ...baseRoom,
        id: "room_0" as EditorRoomId,
        roomAbove: "room_1",
      } as unknown as EditorRoomJson,
    }),
  );

  // mutating a frozen campaign in place would throw - cloning inside avoids it
  expect(() => migrateRoomVerticalLinks(campaign)).not.toThrow();
});
