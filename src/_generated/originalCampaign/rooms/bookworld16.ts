import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "bookworld",
  id: "bookworld16",
  items: {
    "door@0,3,0": {
      config: { direction: "right", toRoom: "bookworld17" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "bookworld18" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0": {
      config: { direction: "away", toRoom: "bookworld15" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 4, y: 8 },
  walls: {
    away: ["book", "none", "none", "book"],
    left: ["book", "book", "cowboy", "book", "book", "cowboy", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
