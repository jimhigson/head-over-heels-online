import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "none",
  floorSkip: [],
  id: "penitentiary16",
  items: {
    "block@7,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@7,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "block@7,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 2, z: 0 },
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
    "block@7,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "block@7,6,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 6, z: 0 },
      type: "block",
    },
    "block@7,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    "lift@3,0,0:ZTwqnv": {
      config: { bottom: 0, top: 9 },
      position: { x: 3, y: 0, z: 0 },
      type: "lift",
    },
    "portableBlock@7,5,1:Z1UEQTQ": {
      config: { style: "cube" },
      position: { x: 7, y: 5, z: 1 },
      type: "portableBlock",
    },
    "portableBlock@7,6,1:Z1UEQTQ": {
      config: { style: "cube" },
      position: { x: 7, y: 6, z: 1 },
      type: "portableBlock",
    },
    "portableBlock@7,7,1:Z1UEQTQ": {
      config: { style: "cube" },
      position: { x: 7, y: 7, z: 1 },
      type: "portableBlock",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary17",
  roomBelow: "penitentiary15",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
    ],
    left: [
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
    ],
  },
} satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
