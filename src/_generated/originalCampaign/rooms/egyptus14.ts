import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "egyptus14",
  items: {
    "block@2,7,1": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 7, z: 1 },
      type: "block",
    },
    "block@3,7,1": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 7, z: 1 },
      type: "block",
    },
    "block@4,7,1": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 7, z: 1 },
      type: "block",
    },
    "block@7,0,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@7,0,4": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 0, z: 4 },
      type: "block",
    },
    "block@7,0,6": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 0, z: 6 },
      type: "block",
    },
    "block@7,1,7": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 1, z: 7 },
      type: "block",
    },
    "block@7,3,2": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 3, z: 2 },
      type: "block",
    },
    "door@3,8,3": {
      config: { direction: "away", toRoom: "egyptus18" },
      position: { x: 3, y: 8, z: 3 },
      type: "door",
    },
    "lift@0,7,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 0, y: 7, z: 0 },
      type: "lift",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus19",
  roomBelow: "egyptus13",
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
