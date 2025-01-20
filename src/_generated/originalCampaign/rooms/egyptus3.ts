import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "egyptus",
  id: "egyptus3",
  items: {
    "door@0,0,0": {
      config: { direction: "right", toRoom: "egyptus2" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,4": {
      config: { direction: "left", toRoom: "egyptus4" },
      position: { x: 8, y: 0, z: 4 },
      type: "door",
    },
    "spring@4,1,0": {
      config: {},
      position: { x: 4, y: 1, z: 0 },
      type: "spring",
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
