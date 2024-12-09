import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  floorSkip: [],
  id: "egyptus19",
  items: {
    "barrier@7,3,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 7, y: 3, z: 2 },
      type: "barrier",
    },
    "barrier@7,3,4:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 7, y: 3, z: 4 },
      type: "barrier",
    },
    "barrier@7,3,6:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 7, y: 3, z: 6 },
      type: "barrier",
    },
    "block@0,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@2,7,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 7, z: 1 },
      type: "block",
    },
    "block@4,7,2:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 7, z: 2 },
      type: "block",
    },
    "block@7,0,7:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 0, z: 7 },
      type: "block",
    },
    "block@7,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "lift@5,7,0:ZTwqnv": {
      config: { bottom: 0, top: 9 },
      position: { x: 5, y: 7, z: 0 },
      type: "lift",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus20",
  roomBelow: "egyptus14",
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
