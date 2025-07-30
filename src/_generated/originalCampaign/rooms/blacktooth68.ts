import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "blacktooth68",
  items: {
    "block@0,0,0": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,0,1": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 0, y: 0, z: 1 },
      type: "block",
    },
    "block@0,0,2": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 0, y: 0, z: 2 },
      type: "block",
    },
    "block@0,5,0": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@0,5,1": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 0, y: 5, z: 1 },
      type: "block",
    },
    "block@0,5,2": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 0, y: 5, z: 2 },
      type: "block",
    },
    "block@2,7,0": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 2, y: 7, z: 0 },
      type: "block",
    },
    "block@2,7,1": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 2, y: 7, z: 1 },
      type: "block",
    },
    "block@2,7,2": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 2, y: 7, z: 2 },
      type: "block",
    },
    "block@3,0,3": {
      config: { style: "organic", times: { x: 2, z: 4 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@7,4,3": {
      config: { style: "organic", times: { y: 2, z: 4 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,7,0": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    "block@7,7,1": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 7, y: 7, z: 1 },
      type: "block",
    },
    "block@7,7,2": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 7, y: 7, z: 2 },
      type: "block",
    },
    "door@3,0,5": {
      config: { direction: "towards", toRoom: "blacktooth66" },
      position: { x: 3, y: 0, z: 5 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "blacktooth76" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    extraBarrier: {
      config: { axis: "x", times: { x: 3, z: 8 } },
      position: { x: 4, y: 0.6, z: 0 },
      type: "barrier",
    },
    "floor@0,0,0": {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: [
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
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
