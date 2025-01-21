import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "none",
  id: "egyptus16",
  items: {
    "block@0,5,0": {
      config: { style: "organic" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@1,5,0": {
      config: { style: "organic" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@2,5,0": {
      config: { style: "organic" },
      position: { x: 2, y: 5, z: 0 },
      type: "block",
    },
    "block@3,5,0": {
      config: { style: "organic" },
      position: { x: 3, y: 5, z: 0 },
      type: "block",
    },
    "block@4,5,0": {
      config: { style: "organic" },
      position: { x: 4, y: 5, z: 0 },
      type: "block",
    },
    "block@5,5,0": {
      config: { style: "organic" },
      position: { x: 5, y: 5, z: 0 },
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
