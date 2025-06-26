import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "safari2",
  items: {
    "block@3,0,0": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,7,1": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 11, z: 1 },
      type: "block",
    },
    "block@7,4,0": {
      config: { style: "organic" },
      position: { x: 7, y: 6, z: 0 },
      type: "block",
    },
    "deadlyBlock@0,0,0": {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,1,1": {
      config: { style: "volcano" },
      position: { x: 0, y: 1, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,7,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 9, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,3,0": {
      config: { style: "volcano" },
      position: { x: 2, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,0,1": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 6, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,0,0": {
      config: { style: "volcano" },
      position: { x: 7, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,0,1": {
      config: { direction: "towards", toRoom: "safari1" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    "door@3,8,3": {
      config: { direction: "away", toRoom: "safari3" },
      position: { x: 3, y: 12, z: 3 },
      type: "door",
    },
    extraVolcano: {
      config: { style: "volcano", times: { x: 8, y: 2 } },
      position: { x: 0, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    "floor@0,0,0": {
      config: { floorType: "deadly", times: { x: 8, y: 12 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    movingPlatform2: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "right",
      },
      position: { x: 6, y: 9, z: 0 },
      type: "movingPlatform",
    },
    "movingPlatform@7,1,0": {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "away",
      },
      position: { x: 7, y: 1, z: 0 },
      type: "movingPlatform",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 12 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["wall", "shield", "wall"] },
      position: { x: 0, y: 12, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: { direction: "away", tiles: ["wall", "window", "wall"] },
      position: { x: 5, y: 12, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 8, y: 12 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
