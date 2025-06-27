import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "blacktooth84",
  items: {
    "block@0,0,0": {
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,3,3": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    "block@4,0,0": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "block@4,3,0": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 4, y: 3, z: 0 },
      type: "block",
    },
    "block@4,3,1": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 4, y: 3, z: 1 },
      type: "block",
    },
    "block@7,3,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "door@0,3,4": {
      config: { direction: "right", toRoom: "blacktooth85" },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    "door@8,3,2": {
      config: { direction: "left", toRoom: "blacktooth77" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    extraTower: {
      config: { style: "tower", times: { y: 2, z: 3 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "floor@0,0,0": {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "portableBlock@4,7,0": {
      config: { style: "cube" },
      position: { x: 4, y: 7, z: 0 },
      type: "portableBlock",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
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
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
