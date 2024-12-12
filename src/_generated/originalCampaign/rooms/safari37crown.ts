import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "safari",
  floorSkip: [],
  id: "safari37crown",
  items: {
    "baddie@7,2,1:Z2jz06D": {
      config: {
        activated: true,
        startDirection: "right",
        style: "starsAndStripes",
        which: "american-football-head",
      },
      position: { x: 7, y: 2, z: 1 },
      type: "baddie",
    },
    "block@0,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    "block@0,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@0,7,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@0,7,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 7, z: 1 },
      type: "block",
    },
    "block@0,7,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 7, z: 2 },
      type: "block",
    },
    "block@0,7,3:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 7, z: 3 },
      type: "block",
    },
    "block@0,7,4:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 7, z: 4 },
      type: "block",
    },
    "block@0,7,5:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 7, z: 5 },
      type: "block",
    },
    "block@1,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 2, z: 0 },
      type: "block",
    },
    "block@1,4,0:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 1, y: 4, z: 0 },
      type: "block",
    },
    "block@2,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 2, z: 0 },
      type: "block",
    },
    "block@2,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 4, z: 0 },
      type: "block",
    },
    "block@3,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    "block@3,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    "block@4,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 2, z: 0 },
      type: "block",
    },
    "block@4,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 4, z: 0 },
      type: "block",
    },
    "block@5,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 2, z: 0 },
      type: "block",
    },
    "block@5,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 4, z: 0 },
      type: "block",
    },
    "block@6,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 2, z: 0 },
      type: "block",
    },
    "block@6,3,0:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 3, z: 0 },
      type: "block",
    },
    "block@6,3,1:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 3, z: 1 },
      type: "block",
    },
    "block@6,3,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 3, z: 2 },
      type: "block",
    },
    "block@6,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 4, z: 0 },
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
    "door@3,0,0:rjGsN": {
      config: { direction: "towards", toRoom: "safari33" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "movableBlock@0,7,6:Z15GVb5": {
      config: { style: "anvil" },
      position: { x: 0, y: 7, z: 6 },
      type: "movableBlock",
    },
    "movableBlock@3,5,0:Z15GVb5": {
      config: { style: "anvil" },
      position: { x: 3, y: 5, z: 0 },
      type: "movableBlock",
    },
    "pickup@0,7,7:2fxkqv": {
      config: { gives: "crown" },
      position: { x: 0, y: 7, z: 7 },
      type: "pickup",
    },
    "portableBlock@7,3,1:Z1SKpmn": {
      config: { style: "drum" },
      position: { x: 7, y: 3, z: 1 },
      type: "portableBlock",
    },
  },
  planet: "safari",
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
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
