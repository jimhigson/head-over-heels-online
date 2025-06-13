import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "penitentiary18fish",
  items: {
    block2: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 7, y: 4, z: 3 },
      type: "block",
    },
    block3: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 8, y: 4, z: 3 },
      type: "block",
    },
    block4: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 14, y: 4, z: 3 },
      type: "block",
    },
    block5: {
      config: { style: "organic" },
      position: { x: 15, y: 4, z: 3 },
      type: "block",
    },
    "block@0,4,3": {
      config: { style: "organic", times: { x: 7 } },
      position: { x: 0, y: 4, z: 3 },
      type: "block",
    },
    "door@16,2,2": {
      config: { direction: "left", toRoom: "penitentiary12" },
      position: { x: 16, y: 2, z: 2 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "penitentiary17" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    extraShield: {
      config: { gives: "shield" },
      isExtra: true,
      position: { x: 15, y: 5, z: 3 },
      type: "pickup",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 16, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "pickup@12,4,4": {
      config: { gives: "reincarnation" },
      position: { x: 12, y: 4, z: 4 },
      type: "pickup",
    },
    "portableBlock@11,1,0": {
      config: { style: "sticks" },
      position: { x: 11, y: 1, z: 0 },
      type: "portableBlock",
    },
    supportTowers0: {
      config: { style: "tower", times: { x: 2, z: 3 } },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    supportTowers1: {
      config: { style: "tower", times: { x: 2, z: 3 } },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    supportTowers2: {
      config: { style: "tower", times: { x: 2, z: 3 } },
      position: { x: 14, y: 4, z: 0 },
      type: "block",
    },
    "teleporter@0,4,4": {
      config: { toPosition: { x: 0, y: 3, z: 4 }, toRoom: "penitentiary30" },
      position: { x: 0, y: 4, z: 4 },
      type: "teleporter",
    },
    "teleporter@15,4,4": {
      config: {
        toPosition: { x: 7, y: 5, z: 4 },
        toRoom: "penitentiary34crown",
      },
      position: { x: 15, y: 4, z: 4 },
      type: "teleporter",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: [
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
        ],
        times: { x: 16 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@16,0,0": {
      config: { direction: "left", tiles: ["loop", "loop"], times: { y: 2 } },
      position: { x: 16, y: 0, z: 0 },
      type: "wall",
    },
    "wall@16,4,0": {
      config: { direction: "left", tiles: ["loop", "loop"], times: { y: 2 } },
      position: { x: 16, y: 4, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 11 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 1, y: 0 },
        physicalPosition: { from: { x: 8, y: 0 }, to: { x: 16, y: 6 } },
      },
      right: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 6 } },
      },
    },
  },
  planet: "penitentiary",
  size: { x: 16, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
