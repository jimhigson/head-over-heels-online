import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "egyptus",
  id: "egyptus9fish",
  items: {
    "block@2,0,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 0, z: 4 },
      type: "block",
    },
    "block@3,0,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 4 },
      type: "block",
    },
    "block@3,1,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 1, z: 4 },
      type: "block",
    },
    "block@3,2,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 2, z: 4 },
      type: "block",
    },
    "block@3,3,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 3, z: 4 },
      type: "block",
    },
    "block@3,4,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 4, z: 4 },
      type: "block",
    },
    "block@3,5,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 5, z: 4 },
      type: "block",
    },
    "block@3,6,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 6, z: 4 },
      type: "block",
    },
    "block@3,7,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 7, z: 4 },
      type: "block",
    },
    "door@1,0,0:97i2E": {
      config: { direction: "towards", toRoom: "egyptus8" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0:Z1yI7xy": {
      config: { direction: "away", toRoom: "egyptus10" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    "pickup@3,3,5:ZPJAGD": {
      config: { gives: "reincarnation" },
      position: { x: 3, y: 3, z: 5 },
      type: "pickup",
    },
    "portableBlock@0,7,0:Z14c3Fl": {
      config: { style: "sticks" },
      position: { x: 0, y: 7, z: 0 },
      type: "portableBlock",
    },
    "teleporter@2,0,5:ZPneb4": {
      config: { toRoom: "egyptus13" },
      position: { x: 2, y: 0, z: 5 },
      type: "teleporter",
    },
  },
  planet: "egyptus",
  size: { x: 4, y: 8 },
  walls: {
    away: ["hieroglyphics", "none", "none", "hieroglyphics"],
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
