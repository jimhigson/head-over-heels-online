import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth77",
  items: {
    "barrier@4,0,0": {
      config: { axis: "y", times: { y: 4, z: 3 } },
      position: { x: 4, y: 0, z: 0 },
      type: "barrier",
    },
    "barrier@4,0,3": {
      config: { axis: "y", disappearing: { on: "touch" } },
      position: { x: 4, y: 0, z: 3 },
      type: "barrier",
    },
    "barrier@4,0,4": {
      config: { axis: "y", times: { z: 2 } },
      position: { x: 4, y: 0, z: 4 },
      type: "barrier",
    },
    "barrier@4,1,3": {
      config: { axis: "y", times: { y: 3 } },
      position: { x: 4, y: 1, z: 3 },
      type: "barrier",
    },
    "barrier@4,1,5": {
      config: { axis: "y", times: { y: 3 } },
      position: { x: 4, y: 1, z: 5 },
      type: "barrier",
    },
    "barrier@4,2,4": {
      config: { axis: "y", times: { y: 2 } },
      position: { x: 4, y: 2, z: 4 },
      type: "barrier",
    },
    "door@0,1,0": {
      config: { direction: "right", toRoom: "blacktooth84" },
      position: { x: 0, y: 1, z: 0 },
      type: "door",
    },
    "door@8,1,0": {
      config: { direction: "left", toRoom: "blacktooth71" },
      position: { x: 8, y: 1, z: 0 },
      type: "door",
    },
    "portableBlock@3,3,0": {
      config: { style: "cube" },
      position: { x: 3, y: 3, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@4,0,6": {
      config: { style: "cube" },
      position: { x: 4, y: 0, z: 6 },
      type: "portableBlock",
    },
    "pushableBlock@3,1,0": {
      config: {},
      position: { x: 3, y: 1, z: 0 },
      type: "pushableBlock",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,3,0": {
      config: { direction: "right" },
      position: { x: 0, y: 3, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
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
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["shield"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,3,0": {
      config: { direction: "left", tiles: ["shield"] },
      position: { x: 8, y: 3, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 4 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
