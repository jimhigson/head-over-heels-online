import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "none",
  floorSkip: [],
  id: "bookworld32",
  items: {
    "door@8,3,1:Z1lPEz3": {
      config: { direction: "left", toRoom: "bookworld31" },
      position: { x: 8, y: 3, z: 1 },
      type: "door",
    },
  },
  planet: "bookworld",
  roomBelow: "bookworld33",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["book", "book", "person", "none", "none", "person", "book", "book"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
