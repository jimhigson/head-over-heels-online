import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "egyptus",
  id: "egyptus13",
  items: {
    "block@2,0,4": {
      config: { style: "organic" },
      position: { x: 2, y: 0, z: 4 },
      type: "block",
    },
    "block@3,0,4": {
      config: { style: "organic" },
      position: { x: 3, y: 0, z: 4 },
      type: "block",
    },
    "block@4,0,4": {
      config: { style: "organic" },
      position: { x: 4, y: 0, z: 4 },
      type: "block",
    },
    "block@5,0,4": {
      config: { style: "organic" },
      position: { x: 5, y: 0, z: 4 },
      type: "block",
    },
    "block@6,0,4": {
      config: { style: "organic" },
      position: { x: 6, y: 0, z: 4 },
      type: "block",
    },
    "block@7,0,4": {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 4 },
      type: "block",
    },
    "block@7,0,6": {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 6 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "egyptus12" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "lift@0,0,2": {
      config: { bottom: 2, top: 5 },
      position: { x: 0, y: 0, z: 2 },
      type: "lift",
    },
    "movableBlock@1,0,0": {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 0, z: 0 },
      type: "movableBlock",
    },
    "spring@7,0,7": {
      config: {},
      position: { x: 7, y: 0, z: 7 },
      type: "spring",
    },
    "teleporter@4,0,5": {
      config: { toPosition: { x: 2, y: 0, z: 5 }, toRoom: "egyptus9fish" },
      position: { x: 4, y: 0, z: 5 },
      type: "teleporter",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus14",
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
