import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "egyptus",
  floorSkip: [],
  id: "egyptus15",
  items: {
    "block@0,5,2:95uHj": {
      config: { disappearing: true, style: "organic" },
      position: { x: 0, y: 5, z: 2 },
      type: "block",
    },
    "block@0,5,6:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 5, z: 6 },
      type: "block",
    },
    "block@1,5,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 5, z: 1 },
      type: "block",
    },
    "block@1,5,5:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 5, z: 5 },
      type: "block",
    },
    "block@2,5,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 5, z: 3 },
      type: "block",
    },
    "block@3,5,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 5, z: 1 },
      type: "block",
    },
    "block@3,5,4:95uHj": {
      config: { disappearing: true, style: "organic" },
      position: { x: 3, y: 5, z: 4 },
      type: "block",
    },
    "block@5,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    "deadlyBlock@0,5,0:ZaRhUQ": {
      config: { style: "spikes" },
      position: { x: 0, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@2,0,0:ZruPBS": {
      config: { direction: "towards", toRoom: "egyptus10" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "spring@0,5,7:13y": {
      config: {},
      position: { x: 0, y: 5, z: 7 },
      type: "spring",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus16",
  size: { x: 6, y: 6 },
  walls: {
    away: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
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
} satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
