import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "none",
  floorSkip: [],
  id: "egyptus32",
  items: {
    "block@7,0,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 0, z: 3 },
      type: "block",
    },
    "block@7,1,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 1, z: 3 },
      type: "block",
    },
    "door@8,0,5:Z1B08It": {
      config: { direction: "left", toRoom: "egyptus31" },
      position: { x: 8, y: 0, z: 5 },
      type: "door",
    },
  },
  planet: "egyptus",
  roomBelow: "egyptus33",
  size: { x: 8, y: 2 },
  walls: {
    away: [
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
    ],
    left: ["none", "none"],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
