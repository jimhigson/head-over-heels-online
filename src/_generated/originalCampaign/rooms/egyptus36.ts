import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "egyptus36",
  items: {
    "block@1,0,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@1,1,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    "block@1,2,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 2, z: 0 },
      type: "block",
    },
    "block@1,3,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 3, z: 0 },
      type: "block",
    },
    "block@1,4,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 4, z: 0 },
      type: "block",
    },
    "block@1,5,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@1,6,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    "block@1,7,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "lift@0,0,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 0, y: 0, z: 0 },
      type: "lift",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus37",
  roomBelow: "egyptus35",
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
