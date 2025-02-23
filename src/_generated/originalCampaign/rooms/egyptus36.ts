import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "egyptus36",
  items: {
    "block@1,0,0": {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "lift@0,0,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 0, y: 0, z: 0 },
      type: "lift",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus37",
  roomBelow: "egyptus35",
  size: { x: 2, y: 8 },
  walls: {
    away: ["hieroglyphics", "hieroglyphics"],
    left: [
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
