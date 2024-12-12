import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "egyptus",
  floorSkip: [],
  id: "egyptus6",
  items: {
    "block@4,3,0:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 4, y: 3, z: 0 },
      type: "block",
    },
    "block@4,3,1:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 4, y: 3, z: 1 },
      type: "block",
    },
    "block@4,3,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 4, y: 3, z: 2 },
      type: "block",
    },
    "door@0,3,0:2mUfvb": {
      config: { direction: "right", toRoom: "egyptus5" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,8,5:2p0xht": {
      config: { direction: "away", toRoom: "egyptus8" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "movableBlock@2,2,0:1EfFpg": {
      config: { style: "sandwich" },
      position: { x: 2, y: 2, z: 0 },
      type: "movableBlock",
    },
    "movableBlock@2,2,1:1EfFpg": {
      config: { style: "sandwich" },
      position: { x: 2, y: 2, z: 1 },
      type: "movableBlock",
    },
    "movableBlock@4,3,3:1EfFpg": {
      config: { style: "sandwich" },
      position: { x: 4, y: 3, z: 3 },
      type: "movableBlock",
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
