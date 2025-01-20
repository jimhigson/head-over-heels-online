import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "egyptus",
  id: "egyptus28",
  items: {
    "door@0,2,0": {
      config: { direction: "right", toRoom: "egyptus29" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "egyptus27" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@8,2,0": {
      config: { direction: "left", toRoom: "egyptus26" },
      position: { x: 8, y: 2, z: 0 },
      type: "door",
    },
    "moveableDeadly@4,3,0": {
      config: { style: "deadFish" },
      position: { x: 4, y: 3, z: 0 },
      type: "moveableDeadly",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 6 },
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
    left: [
      "hieroglyphics",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
