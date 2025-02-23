import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "egyptus29",
  items: {
    "block@5,0,0": {
      config: { style: "organic" },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    "block@5,3,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 5, y: 3, z: 0 },
      type: "block",
    },
    "door@6,3,2": {
      config: { direction: "left", toRoom: "egyptus28" },
      position: { x: 6, y: 3, z: 2 },
      type: "door",
    },
  },
  planet: "egyptus",
  roomBelow: "egyptus30",
  size: { x: 6, y: 8 },
  walls: {
    away: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
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
