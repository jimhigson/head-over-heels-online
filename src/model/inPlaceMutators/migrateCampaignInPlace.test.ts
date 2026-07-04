import { expect, test } from "vitest";

import { valuesIter } from "../../utils/entries";
import { type AnyRoomJson } from "../RoomJson";
import { migrateCampaignInPlace } from "./migrateCampaignInPlace";

/** a room with a single legacy wall: a near (towards) wall sized by `times`, no tiles */
const roomWithLegacyWall = (id: string): AnyRoomJson =>
  ({
    id,
    planet: "blacktooth" as const,
    color: { hue: "cyan", shade: "basic" } as const,
    size: { x: 8, y: 8 },
    items: {
      wall_0: {
        type: "wall",
        position: { x: 0, y: 0, z: 0 },
        config: { direction: "towards", times: { x: 3 } },
      },
    },
  }) as unknown as AnyRoomJson;

const wallConfigOf = (room: AnyRoomJson) =>
  (
    room.items["wall_0"] as {
      config: { tiles?: unknown[]; times?: unknown };
    }
  ).config;

test("gives legacy walls tiles in every room of the campaign", () => {
  const campaign = {
    rooms: {
      room_0: roomWithLegacyWall("room_0"),
      room_1: roomWithLegacyWall("room_1"),
    },
  };

  migrateCampaignInPlace(campaign);

  for (const room of valuesIter(campaign.rooms)) {
    const config = wallConfigOf(room);
    expect(config.tiles).toHaveLength(3);
    expect(config.times).toBeUndefined();
  }
});
