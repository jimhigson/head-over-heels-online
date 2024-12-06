import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "deadly",
  floorSkip: [],
  id: "penitentiary26",
  items: {
    "block@0,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@4,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "deadlyBlock@0,7,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 7, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,3,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 3, z: 1 },
      type: "deadlyBlock",
    },
    "door@0,3,1:1QJLWh": {
      config: { direction: "right", toRoom: "penitentiary27" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "door@3,0,1:Z4XVIK": {
      config: { direction: "towards", toRoom: "penitentiary25" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    "movableBlock@4,1,0:1EfFpg": {
      config: { style: "sandwich" },
      position: { x: 4, y: 1, z: 0 },
      type: "movableBlock",
    },
  },
  planet: "penitentiary",
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
