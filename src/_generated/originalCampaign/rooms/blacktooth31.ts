import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth31",
  items: {
    "block@5,2,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 5, y: 2, z: 0 },
      type: "block",
    },
    "block@5,2,1": {
      config: { style: "organic" },
      position: { x: 5, y: 2, z: 1 },
      type: "block",
    },
    "deadlyBlock@0,1,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,10,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,4,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,7,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,0,0": {
      config: { style: "volcano" },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,11,0": {
      config: { style: "volcano" },
      position: { x: 1, y: 11, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,0": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 1, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,0,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,11,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 11, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,5,0": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 4, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,1,0": {
      config: { style: "volcano" },
      position: { x: 5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,10,0": {
      config: { style: "volcano" },
      position: { x: 5, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,4,0": {
      config: { style: "volcano" },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,7,0": {
      config: { style: "volcano" },
      position: { x: 5, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "door@2,12,3": {
      config: { direction: "away", toRoom: "blacktooth11" },
      position: { x: 2, y: 12, z: 3 },
      type: "door",
    },
    "door@6,2,3": {
      config: { direction: "left", toRoom: "blacktooth30" },
      position: { x: 6, y: 2, z: 3 },
      type: "door",
    },
    "portableBlock@2,8,0": {
      config: { style: "drum" },
      position: { x: 2, y: 8, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@3,9,0": {
      config: { style: "drum" },
      position: { x: 3, y: 9, z: 0 },
      type: "portableBlock",
    },
    "wall@0,0,0:3gaUv": {
      config: { direction: "right", tiles: [], times: { y: 12 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDXu": {
      config: { direction: "towards", tiles: [], times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,12,0": {
      config: {
        direction: "away",
        tiles: ["plain", "shield"],
        times: { x: 2 },
      },
      position: { x: 0, y: 12, z: 0 },
      type: "wall",
    },
    "wall@4,12,0": {
      config: {
        direction: "away",
        tiles: ["shield", "plain"],
        times: { x: 2 },
      },
      position: { x: 4, y: 12, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield"],
        times: { y: 2 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,4,0": {
      config: {
        direction: "left",
        tiles: [
          "shield",
          "plain",
          "plain",
          "armour",
          "shield",
          "shield",
          "armour",
          "plain",
        ],
        times: { y: 8 },
      },
      position: { x: 6, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 12 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
