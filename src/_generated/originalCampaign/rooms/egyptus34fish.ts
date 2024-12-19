import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "egyptus",
  id: "egyptus34fish",
  items: {
    "baddie@5,4,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 5, y: 4, z: 0 },
      type: "baddie",
    },
    "ball@0,2,1:13y": {
      config: {},
      position: { x: 0, y: 2, z: 1 },
      type: "ball",
    },
    "block@0,2,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    "block@0,3,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,6,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 6, z: 0 },
      type: "block",
    },
    "block@0,7,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@0,7,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 7, z: 1 },
      type: "block",
    },
    "block@0,7,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 7, z: 2 },
      type: "block",
    },
    "block@0,7,3:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 7, z: 3 },
      type: "block",
    },
    "block@0,7,4:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 7, z: 4 },
      type: "block",
    },
    "door@2,0,0:ZruyOR": {
      config: { direction: "towards", toRoom: "egyptus33" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "door@2,8,0:Z1yHPf2": {
      config: { direction: "away", toRoom: "egyptus35" },
      position: { x: 2, y: 8, z: 0 },
      type: "door",
    },
    "pickup@0,7,5:ZPJAGD": {
      config: { gives: "reincarnation" },
      position: { x: 0, y: 7, z: 5 },
      type: "pickup",
    },
  },
  planet: "egyptus",
  size: { x: 6, y: 8 },
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
