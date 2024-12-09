import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "safari",
  floorSkip: [],
  id: "safari1",
  items: {
    "door@2,8,0:1SoohN": {
      config: { direction: "away", toRoom: "safari2" },
      position: { x: 2, y: 8, z: 0 },
      type: "door",
    },
    "teleporter@2,3,0:uIsOk": {
      config: { toRoom: "moonbase21tosafari" },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@2,4,0:uIsOk": {
      config: { toRoom: "moonbase21tosafari" },
      position: { x: 2, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,3,0:uIsOk": {
      config: { toRoom: "moonbase21tosafari" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0:uIsOk": {
      config: { toRoom: "moonbase21tosafari" },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "safari",
  size: { x: 6, y: 8 },
  walls: {
    away: ["wall", "shield", "none", "none", "shield", "wall"],
    left: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
