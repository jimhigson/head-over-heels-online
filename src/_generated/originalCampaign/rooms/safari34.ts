import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "dimmed" },
  floor: "safari",
  floorSkip: [],
  id: "safari34",
  items: {
    "block@4,0,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 0, z: 3 },
      type: "block",
    },
    "block@4,1,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 1, z: 3 },
      type: "block",
    },
    "block@4,2,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 2, z: 3 },
      type: "block",
    },
    "block@4,3,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 3, z: 3 },
      type: "block",
    },
    "block@4,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 4, z: 3 },
      type: "block",
    },
    "block@4,5,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 5, z: 3 },
      type: "block",
    },
    "block@4,6,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 6, z: 3 },
      type: "block",
    },
    "block@4,7,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 7, z: 3 },
      type: "block",
    },
    "deadlyBlock@4,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,6,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,7,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,0:Z2p4t6l": {
      config: { direction: "right", toRoom: "safari33" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "lift@7,7,0:ZTwqnv": {
      config: { bottom: 0, top: 9 },
      position: { x: 7, y: 7, z: 0 },
      type: "lift",
    },
    "portableBlock@1,0,0:Z1SKpmn": {
      config: { style: "drum" },
      position: { x: 1, y: 0, z: 0 },
      type: "portableBlock",
    },
    "teleporter@3,3,0:1mtSsV": {
      config: { toRoom: "safari1" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0:1mtSsV": {
      config: { toRoom: "safari1" },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "safari",
  roomAbove: "safari35",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
    left: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
  },
} satisfies RoomJson<"safari", OriginalCampaignRoomId>;
