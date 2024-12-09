import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  floorSkip: [],
  id: "bookworld38",
  items: {
    "door@3,0,5:Jfrpi": {
      config: { direction: "towards", toRoom: "bookworld37" },
      position: { x: 3, y: 0, z: 5 },
      type: "door",
    },
  },
  planet: "bookworld",
  roomBelow: "bookworld39",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
