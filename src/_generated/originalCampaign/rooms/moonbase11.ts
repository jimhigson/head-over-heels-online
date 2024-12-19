import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "moonbase",
  id: "moonbase11",
  items: {
    "door@0,0,0:5Csip": {
      config: { direction: "towards", toRoom: "moonbase10" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,0:11gRJC": {
      config: { direction: "away", toRoom: "moonbase12" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
    "door@2,3,0:Z8uWnj": {
      config: { direction: "left", toRoom: "moonbase19" },
      position: { x: 2, y: 3, z: 0 },
      type: "door",
    },
  },
  planet: "moonbase",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
    left: [
      "window2",
      "coil",
      "window3",
      "none",
      "none",
      "window3",
      "coil",
      "window1",
    ],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
