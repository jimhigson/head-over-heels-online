import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "egyptus37",
  items: {
    "block@0,0,0": {
      config: { disappearing: true, style: "artificial" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@1,3,0": {
      config: { disappearing: true, style: "artificial" },
      position: { x: 1, y: 3, z: 0 },
      type: "block",
    },
    "block@1,4,0": {
      config: { disappearing: true, style: "artificial" },
      position: { x: 1, y: 4, z: 0 },
      type: "block",
    },
    "door@2,3,2": {
      config: { direction: "left", toRoom: "egyptus38" },
      position: { x: 2, y: 3, z: 2 },
      type: "door",
    },
  },
  planet: "egyptus",
  roomBelow: "egyptus36",
  size: { x: 2, y: 8 },
  walls: {
    away: ["hieroglyphics", "hieroglyphics"],
    left: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
