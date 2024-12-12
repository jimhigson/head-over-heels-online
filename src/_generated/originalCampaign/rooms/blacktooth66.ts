import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth66",
  items: {
    "door@0,3,0:uN8sA": {
      config: { direction: "right", toRoom: "blacktooth67" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@2,0,0:Z1V7vR6": {
      config: { direction: "towards", toRoom: "blacktooth65" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "door@2,8,0:xRUY4": {
      config: { direction: "away", toRoom: "blacktooth68" },
      position: { x: 2, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 8 },
  walls: {
    away: ["plain", "shield", "none", "none", "shield", "plain"],
    left: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
