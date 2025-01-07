import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "bookworld32",
  items: {
    "door@8,3,1": {
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
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
