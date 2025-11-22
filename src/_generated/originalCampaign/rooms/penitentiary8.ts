import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  height: 11,
  id: "penitentiary8",
  items: {
    block: {
      config: { style: "artificial", times: { z: 4 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@0,4,7": {
      config: { style: "artificial" },
      position: { x: 0, y: 4, z: 7 },
      type: "block",
    },
    "block@1,2,2": {
      config: { style: "artificial" },
      position: { x: 1, y: 2, z: 2 },
      type: "block",
    },
    "door@0,0,0": {
      config: { direction: "towards", toRoom: "penitentiary7" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    extra1: {
      config: { style: "artificial" },
      position: { x: 0, y: 5, z: 5 },
      type: "block",
    },
    extra2: {
      config: { style: "artificial", times: { y: 3 } },
      position: { x: 0, y: 5, z: 4 },
      type: "block",
    },
    extra3: {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 0, y: 4, z: 6 },
      type: "block",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 2, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "portableBlock@1,2,0": {
      config: { style: "drum" },
      position: { x: 1, y: 2, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@1,2,1": {
      config: { style: "drum" },
      position: { x: 1, y: 2, z: 1 },
      type: "portableBlock",
    },
    "portableBlock@1,2,3": {
      config: { style: "drum" },
      position: { x: 1, y: 2, z: 3 },
      type: "portableBlock",
    },
    "wall@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["loop", "loop"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@2,0,0": {
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
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary9",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
