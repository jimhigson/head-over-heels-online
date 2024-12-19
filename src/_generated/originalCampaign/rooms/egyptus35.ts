import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "egyptus",
  id: "egyptus35",
  items: {
    "block@1,2,4:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 1, y: 2, z: 4 },
      type: "block",
    },
    "block@1,3,4:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 1, y: 3, z: 4 },
      type: "block",
    },
    "block@1,4,3:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 1, y: 4, z: 3 },
      type: "block",
    },
    "block@1,5,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 1, y: 5, z: 2 },
      type: "block",
    },
    "block@1,6,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 1, y: 6, z: 1 },
      type: "block",
    },
    "block@1,7,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "deadlyBlock@0,7,2:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 0, y: 7, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,5:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 5, z: 5 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,6,4:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 6, z: 4 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,7,3:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 7, z: 3 },
      type: "deadlyBlock",
    },
    "door@0,0,0:Z2qU8NU": {
      config: { direction: "towards", toRoom: "egyptus34fish" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "portableBlock@0,2,0:Z1SKpmn": {
      config: { style: "drum" },
      position: { x: 0, y: 2, z: 0 },
      type: "portableBlock",
    },
    "spring@1,2,5:13y": {
      config: {},
      position: { x: 1, y: 2, z: 5 },
      type: "spring",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus36",
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
