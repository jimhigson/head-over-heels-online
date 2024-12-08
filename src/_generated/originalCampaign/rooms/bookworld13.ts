import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld13",
  items: {
    "door@0,0,0:286m3A": {
      config: { direction: "right", toRoom: "bookworld14" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,0:ZMrcIV": {
      config: { direction: "left", toRoom: "bookworld12fish" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 2 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["none", "none"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
