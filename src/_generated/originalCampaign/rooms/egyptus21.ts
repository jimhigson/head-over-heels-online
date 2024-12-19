import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "egyptus",
  id: "egyptus21",
  items: {
    "door@0,0,0:2rMvfJ": {
      config: { direction: "right", toRoom: "egyptus20" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,0:Z1B0gt6": {
      config: { direction: "left", toRoom: "egyptus22" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
  },
  planet: "egyptus",
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
