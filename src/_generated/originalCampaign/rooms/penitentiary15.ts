import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "none",
  floorSkip: [],
  id: "penitentiary15",
  items: {
    "baddie@7,7,1:Z8uA9O": {
      config: { activated: true, startDirection: "right", which: "turtle" },
      position: { x: 7, y: 7, z: 1 },
      type: "baddie",
    },
    "block@0,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "block@0,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    "block@0,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@0,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@0,6,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 6, z: 0 },
      type: "block",
    },
    "block@0,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@1,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@1,1,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 1, z: 1 },
      type: "block",
    },
    "block@1,2,1:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 1, y: 2, z: 1 },
      type: "block",
    },
    "block@1,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@2,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@2,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 7, z: 0 },
      type: "block",
    },
    "block@3,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@4,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "block@4,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    "block@5,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    "block@5,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 7, z: 0 },
      type: "block",
    },
    "block@6,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    "block@6,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 7, z: 0 },
      type: "block",
    },
    "block@7,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 0, z: 0 },
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
    "block@7,1,6:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 1, z: 6 },
      type: "block",
    },
    "block@7,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "block@7,2,5:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 2, z: 5 },
      type: "block",
    },
    "block@7,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,3,5:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 3, z: 5 },
      type: "block",
    },
    "block@7,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    "block@7,4,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 4, z: 4 },
      type: "block",
    },
    "block@7,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "block@7,5,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 5, z: 4 },
      type: "block",
    },
    "block@7,6,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 6, z: 0 },
      type: "block",
    },
    "block@7,6,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 6, z: 4 },
      type: "block",
    },
    "block@7,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    "block@7,7,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 7, z: 3 },
      type: "block",
    },
    "portableBlock@1,1,2:Z1UEQTQ": {
      config: { style: "cube" },
      position: { x: 1, y: 1, z: 2 },
      type: "portableBlock",
    },
    "portableBlock@1,1,3:Z1UEQTQ": {
      config: { style: "cube" },
      position: { x: 1, y: 1, z: 3 },
      type: "portableBlock",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary16",
  roomBelow: "penitentiary14",
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
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;