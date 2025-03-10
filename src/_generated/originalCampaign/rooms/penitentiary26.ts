import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "deadly",
  id: "penitentiary26",
  items: {
    "block@0,4,0": {
      config: { style: "organic" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@4,0,0": {
      config: { style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "deadlyBlock@0,7,1": {
      config: { style: "volcano" },
      position: { x: 0, y: 7, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,3,0": {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 7, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,1": {
      config: { direction: "right", toRoom: "penitentiary27" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "door@3,0,1": {
      config: { direction: "towards", toRoom: "penitentiary25" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    "movableBlock@4,1,0": {
      config: {
        activated: "onStand",
        movement: "clockwise",
        startDirection: "away",
        style: "sandwich",
      },
      position: { x: 4, y: 1, z: 0 },
      type: "movableBlock",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoEJK": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
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
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: [
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
        ],
        times: { y: 8 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
