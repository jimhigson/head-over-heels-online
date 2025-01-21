import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "safari",
  id: "safari20",
  items: {
    "door@0,3,0": {
      config: { direction: "right", toRoom: "safari19triple" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@1,8,0": {
      config: { direction: "away", toRoom: "safari22" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    "door@4,3,0": {
      config: { direction: "left", toRoom: "safari21" },
      position: { x: 4, y: 3, z: 0 },
      type: "door",
    },
  },
  planet: "safari",
  size: { x: 4, y: 8 },
  walls: {
    away: ["wall", "none", "none", "wall"],
    left: ["wall", "shield", "wall", "none", "none", "wall", "window", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
