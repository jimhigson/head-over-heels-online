import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "none",
  id: "safari9",
  items: {
    "block@0,2,3": {
      config: { style: "organic" },
      position: { x: 0, y: 2, z: 3 },
      type: "block",
    },
    "block@7,2,3": {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 3 },
      type: "block",
    },
    "deadlyBlock@0,1,2": {
      config: { style: "volcano", times: { x: 8 } },
      position: { x: 0, y: 1, z: 2 },
      type: "deadlyBlock",
    },
    "door@0,2,4": {
      config: { direction: "right", toRoom: "safari8" },
      position: { x: 0, y: 2, z: 4 },
      type: "door",
    },
    "door@8,2,5": {
      config: { direction: "left", toRoom: "safari14" },
      position: { x: 8, y: 2, z: 5 },
      type: "door",
    },
    "movableBlock@0,1,3": {
      config: {
        activated: "onStand",
        movement: "clockwise",
        startDirection: "left",
        style: "sandwich",
      },
      position: { x: 0, y: 1, z: 3 },
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
  roomBelow: "safari10",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
