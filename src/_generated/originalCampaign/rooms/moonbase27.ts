import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "moonbase",
  id: "moonbase27",
  items: {
    "door@0,0,0": {
      config: { direction: "towards", toRoom: "moonbase30" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "moonbase26" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@0,8,0": {
      config: { direction: "away", toRoom: "moonbase28" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "moonbase",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
    left: [
      "window2",
      "window1",
      "coil",
      "window3",
      "window2",
      "coil",
      "window2",
      "window1",
    ],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
