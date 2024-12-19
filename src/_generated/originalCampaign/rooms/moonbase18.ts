import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "moonbase",
  id: "moonbase18",
  items: {
    "door@6,2,0:Z8uYbA": {
      config: { direction: "left", toRoom: "moonbase12" },
      position: { x: 6, y: 2, z: 0 },
      type: "door",
    },
    "teleporter@2,2,0:Z1R6zDa": {
      config: { toRoom: "moonbase17" },
      position: { x: 2, y: 2, z: 0 },
      type: "teleporter",
    },
    "teleporter@2,3,0:Z1R6zDa": {
      config: { toRoom: "moonbase17" },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,2,0:Z1R6zDa": {
      config: { toRoom: "moonbase17" },
      position: { x: 3, y: 2, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,3,0:Z1R6zDa": {
      config: { toRoom: "moonbase17" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
  },
  planet: "moonbase",
  size: { x: 6, y: 6 },
  walls: {
    away: ["window1", "coil", "window3", "window2", "coil", "window1"],
    left: ["window3", "window2", "none", "none", "window2", "window1"],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
