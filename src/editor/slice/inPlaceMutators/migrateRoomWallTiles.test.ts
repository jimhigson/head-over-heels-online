import { expect, test } from "vitest";

import {
  type EditorCampaign,
  type EditorRoomId,
  type EditorRoomJson,
} from "../../editorTypes";
import { migrateRoomWallTiles } from "./migrateRoomWallTiles";

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

/** a room with a single legacy wall: a near (towards) wall sized by `times`, no tiles */
const roomWithLegacyWall = (): EditorRoomJson =>
  ({
    ...baseRoom,
    id: "room_0" as EditorRoomId,
    items: {
      wall_0: {
        type: "wall",
        position: { x: 0, y: 0, z: 0 },
        config: { direction: "towards", times: { x: 3 } },
      },
    },
  }) as unknown as EditorRoomJson;

const wallConfigOf = (campaign: EditorCampaign) =>
  (
    campaign.rooms["room_0" as EditorRoomId].items["wall_0"] as {
      config: { tiles?: unknown[]; times?: unknown };
    }
  ).config;

test("a legacy wall (times, no tiles) gains tiles of the times length", () => {
  const result = migrateRoomWallTiles(
    campaignOf({ room_0: roomWithLegacyWall() }),
  );

  expect(wallConfigOf(result).tiles).toHaveLength(3);
});

test("the legacy times property is removed", () => {
  const result = migrateRoomWallTiles(
    campaignOf({ room_0: roomWithLegacyWall() }),
  );

  expect(wallConfigOf(result).times).toBeUndefined();
});

test("idempotent: a wall that already carries tiles is returned unchanged", () => {
  const campaign = campaignOf({
    room_0: {
      ...baseRoom,
      id: "room_0" as EditorRoomId,
      items: {
        wall_0: {
          type: "wall",
          position: { x: 0, y: 0, z: 0 },
          config: { direction: "away", tiles: ["wall", "wall"] },
        },
      },
    } as unknown as EditorRoomJson,
  });

  expect(migrateRoomWallTiles(campaign)).toEqual(campaign);
});

test("does not mutate the (possibly frozen) input campaign", () => {
  const campaign = deepFreeze(campaignOf({ room_0: roomWithLegacyWall() }));

  // mutating a frozen campaign in place would throw - cloning inside avoids it
  expect(() => migrateRoomWallTiles(campaign)).not.toThrow();
});
