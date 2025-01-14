import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "bookworld38",
  items: {
    "door@3,0,5": {
      config: { direction: "towards", toRoom: "bookworld37" },
      position: { x: 3, y: 0, z: 5 },
      type: "door",
    },
  },
  planet: "bookworld",
  roomBelow: "bookworld39",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "cowboy", "book", "book", "cowboy", "book", "book"],
    left: ["book", "book", "cowboy", "book", "book", "cowboy", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
