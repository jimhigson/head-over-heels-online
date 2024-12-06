import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "deadly",
  floorSkip: [],
  id: "blacktooth84",
  items: {
    "block@0,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,3,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    "block@0,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 4, z: 3 },
      type: "block",
    },
    "block@4,0,0:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "block@4,3,0:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 4, y: 3, z: 0 },
      type: "block",
    },
    "block@4,3,1:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 4, y: 3, z: 1 },
      type: "block",
    },
    "block@7,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    "door@0,3,4:uNnWP": {
      config: { direction: "right", toRoom: "blacktooth85" },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    "door@8,3,2:ZUCgkt": {
      config: { direction: "left", toRoom: "blacktooth77" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    "portableBlock@4,7,0:Z1UEQTQ": {
      config: { style: "cube" },
      position: { x: 4, y: 7, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
    left: [
      "plain",
      "shield",
      "plain",
      "none",
      "none",
      "plain",
      "shield",
      "plain",
    ],
  },
} satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
