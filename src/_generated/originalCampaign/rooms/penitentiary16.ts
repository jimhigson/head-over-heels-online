import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "penitentiary16",
  items: {
    "block@7,0,0": {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "floor@0,0,0": {
      config: { floorType: "none", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "lift@3,0,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 3, y: 0, z: 0 },
      type: "lift",
    },
    "portableBlock@7,5,1": {
      config: { style: "cube" },
      position: { x: 7, y: 5, z: 1 },
      type: "portableBlock",
    },
    "portableBlock@7,6,1": {
      config: { style: "cube" },
      position: { x: 7, y: 6, z: 1 },
      type: "portableBlock",
    },
    "portableBlock@7,7,1": {
      config: { style: "cube" },
      position: { x: 7, y: 7, z: 1 },
      type: "portableBlock",
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
      },
      position: { x: 0, y: 8, z: 0 },
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
  roomAbove: "penitentiary17",
  roomBelow: "penitentiary15",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
