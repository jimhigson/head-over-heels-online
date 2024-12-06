import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "magenta", shade: "basic" },
  floor: "deadly",
  floorSkip: [],
  id: "safari7",
  items: {
    "block@0,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@1,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 3, z: 0 },
      type: "block",
    },
    "block@2,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@2,1,0:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 2, y: 1, z: 0 },
      type: "block",
    },
    "block@2,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 2, z: 0 },
      type: "block",
    },
    "block@2,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 3, z: 0 },
      type: "block",
    },
    "block@3,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 3, z: 0 },
      type: "block",
    },
    "block@4,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 3, z: 0 },
      type: "block",
    },
    "block@5,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 3, z: 0 },
      type: "block",
    },
    "door@0,2,1:G95F0": {
      config: { direction: "right", toRoom: "safari6triple" },
      position: { x: 0, y: 2, z: 1 },
      type: "door",
    },
    "door@2,0,1:1hl1rq": {
      config: { direction: "towards", toRoom: "safari6triple" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    "door@6,2,2:LV3sr": {
      config: { direction: "left", toRoom: "safari8" },
      position: { x: 6, y: 2, z: 2 },
      type: "door",
    },
  },
  planet: "safari",
  size: { x: 6, y: 6 },
  walls: {
    away: ["shield", "wall", "window", "window", "wall", "shield"],
    left: ["wall", "shield", "none", "none", "shield", "wall"],
  },
} satisfies RoomJson<"safari", OriginalCampaignRoomId>;
