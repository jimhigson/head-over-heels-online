import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "penitentiary34crown",
  items: {
    "block@0,0,0": {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,0,1": {
      config: { style: "artificial", times: { z: 5 } },
      position: { x: 0, y: 0, z: 1 },
      type: "block",
    },
    "block@0,7,2": {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 2 },
      type: "block",
    },
    "block@7,3,4": {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 7, y: 3, z: 4 },
      type: "block",
    },
    "door@3,8,1": {
      config: { direction: "away", toRoom: "penitentiary33" },
      position: { x: 3, y: 8, z: 1 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "pickup@0,0,6": {
      config: { gives: "crown", planet: "penitentiary" },
      position: { x: 0, y: 0, z: 6 },
      type: "pickup",
    },
    "portableBlock@0,7,3": {
      config: { style: "sticks" },
      position: { x: 0, y: 7, z: 3 },
      type: "portableBlock",
    },
    "pushableBlock@7,3,5": {
      config: {},
      position: { x: 7, y: 3, z: 5 },
      type: "pushableBlock",
    },
    "teleporter@7,5,4": {
      config: {
        toPosition: { x: 15, y: 4, z: 4 },
        toRoom: "penitentiary18fish",
      },
      position: { x: 7, y: 5, z: 4 },
      type: "teleporter",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: { direction: "away", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 5, y: 8, z: 0 },
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
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
