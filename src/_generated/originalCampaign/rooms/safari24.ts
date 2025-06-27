import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "safari24",
  items: {
    "block@1,2,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 2, z: 1 },
      type: "block",
    },
    "block@7,2,1": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 2, z: 1 },
      type: "block",
    },
    "deadlyBlock@4,0,1": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 4, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,1,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,4,0": {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 4, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,5,1": {
      config: { style: "volcano" },
      position: { x: 4, y: 5, z: 1 },
      type: "deadlyBlock",
    },
    "door@0,2,1": {
      config: { direction: "right", toRoom: "safari25" },
      position: { x: 0, y: 2, z: 3 },
      type: "door",
    },
    "door@8,2,3": {
      config: { direction: "left", toRoom: "safari23" },
      position: { x: 8, y: 2, z: 3 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "deadly", times: { x: 8, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    movingPlatform2: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "away",
      },
      position: { x: 7, y: 2.5, z: 0 },
      type: "movingPlatform",
    },
    movingPlatform3: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "left",
      },
      position: { x: 3.5, y: 0, z: 0 },
      type: "movingPlatform",
    },
    movingPlatform4: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "right",
      },
      position: { x: 3.5, y: 5, z: 0 },
      type: "movingPlatform",
    },
    "movingPlatform@0,2,0": {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "towards",
      },
      position: { x: 0, y: 2.5, z: 0 },
      type: "movingPlatform",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: [
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
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["wall", "shield"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,4,0": {
      config: { direction: "left", tiles: ["shield", "wall"] },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
