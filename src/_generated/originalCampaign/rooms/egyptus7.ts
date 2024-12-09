import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "deadly",
  floorSkip: [],
  id: "egyptus7",
  items: {
    "block@0,0,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    "block@0,5,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 5, z: 3 },
      type: "block",
    },
    "block@0,7,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 7, z: 3 },
      type: "block",
    },
    "block@2,7,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 7, z: 3 },
      type: "block",
    },
    "block@3,0,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 3 },
      type: "block",
    },
    "block@4,0,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 0, z: 3 },
      type: "block",
    },
    "block@7,3,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 3, z: 3 },
      type: "block",
    },
    "block@7,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 4, z: 3 },
      type: "block",
    },
    "block@7,7,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 7, z: 3 },
      type: "block",
    },
    "door@3,0,4:97hgo": {
      config: { direction: "towards", toRoom: "egyptus5" },
      position: { x: 3, y: 0, z: 4 },
      type: "door",
    },
    "door@8,3,5:Z1mcWqm": {
      config: { direction: "left", toRoom: "egyptus8" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 8 },
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
