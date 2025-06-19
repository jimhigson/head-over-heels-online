import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "blacktooth4",
  items: {
    block: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 3, z: 0 },
      type: "block",
    },
    block2: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 1, z: 0 },
      type: "block",
    },
    blockDis1: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    blockDis2: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 4, y: 2, z: 0 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "blacktooth5" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    lift2: {
      config: { bottom: 0, top: 11 },
      position: { x: 4, y: 5, z: 11 },
      type: "lift",
    },
    "lift@3,5,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 3, y: 5, z: 0 },
      type: "lift",
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
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
        times: { y: 6 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  roomAbove: "blacktooth3",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
