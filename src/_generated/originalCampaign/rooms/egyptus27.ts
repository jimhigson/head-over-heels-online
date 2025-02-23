import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "deadly",
  id: "egyptus27",
  items: {
    "block@0,7,0": {
      config: { style: "organic", times: { x: 8 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@7,0,0": {
      config: { style: "organic", times: { y: 7 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "door@3,8,2": {
      config: { direction: "away", toRoom: "egyptus28" },
      position: { x: 3, y: 8, z: 2 },
      type: "door",
    },
    "door@8,3,2": {
      config: { direction: "left", toRoom: "egyptus25" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    "pickup@2,2,0": {
      config: { gives: "shield" },
      position: { x: 2, y: 2, z: 0 },
      type: "pickup",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 8 },
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
