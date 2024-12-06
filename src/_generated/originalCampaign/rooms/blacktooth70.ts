import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth70",
  items: {
    "block@0,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@0,5,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 5, z: 1 },
      type: "block",
    },
    "block@0,6,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 6, z: 1 },
      type: "block",
    },
    "block@0,7,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 7, z: 1 },
      type: "block",
    },
    "block@1,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@1,5,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 5, z: 1 },
      type: "block",
    },
    "block@1,6,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 6, z: 1 },
      type: "block",
    },
    "block@1,7,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 7, z: 1 },
      type: "block",
    },
    "deadlyBlock@0,5,4:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 5, z: 4 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,2:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 5, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,3:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 5, z: 3 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,4:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 5, z: 4 },
      type: "deadlyBlock",
    },
    "door@0,0,0:Z1V7vlA": {
      config: { direction: "towards", toRoom: "blacktooth67" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,3:xS2ba": {
      config: { direction: "away", toRoom: "blacktooth71" },
      position: { x: 0, y: 8, z: 3 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
    left: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
  },
} satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
