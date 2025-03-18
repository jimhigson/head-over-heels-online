import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "none",
  id: "safari35",
  items: {
    "block@0,3,0": {
      config: { style: "organic" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@7,7,0": {
      config: { style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    "deadlyBlock@0,5,0": {
      config: { style: "volcano", times: { x: 7 } },
      position: { x: 1, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,1": {
      config: { direction: "right", toRoom: "safari36" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "movingPlatform@7,5,1": {
      config: {
        activated: "on-stand",
        movement: "clockwise",
        startDirection: "right",
        style: "sandwich",
      },
      position: { x: 7, y: 5, z: 1 },
      type: "movingPlatform",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
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
      position: { x: 0, y: 8, z: 0 },
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
        ],
        times: { y: 8 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  roomBelow: "safari34",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
