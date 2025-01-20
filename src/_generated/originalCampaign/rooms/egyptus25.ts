import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "egyptus",
  id: "egyptus25",
  items: {
    "door@0,1,0": {
      config: { direction: "right", toRoom: "egyptus27" },
      position: { x: 0, y: 1, z: 0 },
      type: "door",
    },
    "door@3,4,0": {
      config: { direction: "away", toRoom: "egyptus26" },
      position: { x: 3, y: 4, z: 0 },
      type: "door",
    },
    "door@8,1,0": {
      config: { direction: "left", toRoom: "egyptus24" },
      position: { x: 8, y: 1, z: 0 },
      type: "door",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 4 },
  walls: {
    away: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
    left: ["hieroglyphics", "none", "none", "hieroglyphics"],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
