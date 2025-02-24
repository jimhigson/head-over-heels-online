import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "deadly",
  id: "safari24",
  items: {
    "block@1,2,0": {
      config: { style: "organic" },
      position: { x: 1, y: 2, z: 0 },
      type: "block",
    },
    "block@7,2,1": {
      config: { style: "organic" },
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
      position: { x: 0, y: 2, z: 1 },
      type: "door",
    },
    "door@8,2,3": {
      config: { direction: "left", toRoom: "safari23" },
      position: { x: 8, y: 2, z: 3 },
      type: "door",
    },
    "movableBlock@0,2,0": {
      config: {
        activated: "onStand",
        movement: "clockwise",
        startDirection: "towards",
        style: "sandwich",
      },
      position: { x: 0, y: 2, z: 0 },
      type: "movableBlock",
    },
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
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
        times: { x: 8 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["wall", "shield"], times: { y: 2 } },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,4,0": {
      config: { direction: "left", tiles: ["shield", "wall"], times: { y: 2 } },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
