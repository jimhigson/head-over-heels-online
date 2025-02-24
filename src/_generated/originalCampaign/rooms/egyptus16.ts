import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "none",
  id: "egyptus16",
  items: {
    "block@0,5,0": {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "door@2,6,1": {
      config: { direction: "away", toRoom: "egyptus17" },
      position: { x: 2, y: 6, z: 1 },
      type: "door",
    },
  },
  planet: "egyptus",
  roomBelow: "egyptus15",
  size: { x: 6, y: 6 },
  walls: {
    away: [
      "hieroglyphics",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "hieroglyphics",
    ],
    left: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
