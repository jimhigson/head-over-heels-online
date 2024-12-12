import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "egyptus",
  floorSkip: [],
  id: "egyptus33",
  items: {
    "door@3,2,0:Z1sFxAY": {
      config: { direction: "away", toRoom: "egyptus34fish" },
      position: { x: 3, y: 2, z: 0 },
      type: "door",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus32",
  size: { x: 8, y: 2 },
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
    left: ["hieroglyphics", "hieroglyphics"],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
