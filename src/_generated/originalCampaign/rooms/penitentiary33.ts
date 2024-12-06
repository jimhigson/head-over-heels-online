import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "penitentiary",
  floorSkip: [],
  id: "penitentiary33",
  items: {
    "ball@1,1,3:13y": {
      config: {},
      position: { x: 1, y: 1, z: 3 },
      type: "ball",
    },
    "ball@1,6,3:13y": {
      config: {},
      position: { x: 1, y: 6, z: 3 },
      type: "ball",
    },
    "ball@6,1,3:13y": {
      config: {},
      position: { x: 6, y: 1, z: 3 },
      type: "ball",
    },
    "ball@6,6,3:13y": {
      config: {},
      position: { x: 6, y: 6, z: 3 },
      type: "ball",
    },
    "block@1,1,0:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    "block@1,1,1:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 1, z: 1 },
      type: "block",
    },
    "block@1,1,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 1, z: 2 },
      type: "block",
    },
    "block@1,6,0:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    "block@1,6,1:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 6, z: 1 },
      type: "block",
    },
    "block@1,6,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 6, z: 2 },
      type: "block",
    },
    "block@6,1,0:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 1, z: 0 },
      type: "block",
    },
    "block@6,1,1:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 1, z: 1 },
      type: "block",
    },
    "block@6,1,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 1, z: 2 },
      type: "block",
    },
    "block@6,6,0:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 6, z: 0 },
      type: "block",
    },
    "block@6,6,1:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 6, z: 1 },
      type: "block",
    },
    "block@6,6,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 6, z: 2 },
      type: "block",
    },
    "door@3,0,0:2cTHTK": {
      config: { direction: "towards", toRoom: "penitentiary34crown" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,0:ZtKhPh": {
      config: { direction: "away", toRoom: "penitentiary32" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "teleporter@0,3,0:Z1dKvnA": {
      config: { toRoom: "penitentiary2" },
      position: { x: 0, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@0,4,0:Z1dKvnA": {
      config: { toRoom: "penitentiary2" },
      position: { x: 0, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@1,3,0:Z1dKvnA": {
      config: { toRoom: "penitentiary2" },
      position: { x: 1, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@1,4,0:Z1dKvnA": {
      config: { toRoom: "penitentiary2" },
      position: { x: 1, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "penitentiary",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "loop",
      "skeleton",
      "loop",
      "none",
      "none",
      "loop",
      "skeleton",
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
