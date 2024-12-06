import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "cyan", shade: "dimmed" },
  floor: "deadly",
  floorSkip: [],
  id: "blacktooth35",
  items: {
    "block@1,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@1,10,0:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 1, y: 10, z: 0 },
      type: "block",
    },
    "block@1,12,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 12, z: 0 },
      type: "block",
    },
    "block@1,6,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    "block@1,7,0:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@1,8,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 8, z: 0 },
      type: "block",
    },
    "block@3,12,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 12, z: 0 },
      type: "block",
    },
    "door@1,0,1:Z1V7U8Y": {
      config: { direction: "towards", toRoom: "blacktooth34" },
      position: { x: 1, y: 0, z: 1 },
      type: "door",
    },
    "door@4,11,2:ZUCMBJ": {
      config: { direction: "left", toRoom: "blacktooth36" },
      position: { x: 4, y: 11, z: 2 },
      type: "door",
    },
    "spring@1,2,0:13y": {
      config: {},
      position: { x: 1, y: 2, z: 0 },
      type: "spring",
    },
    "spring@1,4,0:13y": {
      config: {},
      position: { x: 1, y: 4, z: 0 },
      type: "spring",
    },
  },
  planet: "blacktooth",
  size: { x: 4, y: 16 },
  walls: {
    away: ["plain", "shield", "shield", "plain"],
    left: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
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
