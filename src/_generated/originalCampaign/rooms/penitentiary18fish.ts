import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "penitentiary",
  id: "penitentiary18fish",
  items: {
    "block@0,4,3": {
      config: { style: "organic", times: { x: 16 } },
      position: { x: 0, y: 4, z: 3 },
      type: "block",
    },
    "door@16,2,2": {
      config: { direction: "left", toRoom: "penitentiary12" },
      position: { x: 16, y: 2, z: 2 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "penitentiary17" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "pickup@12,4,4": {
      config: { gives: "reincarnation" },
      position: { x: 12, y: 4, z: 4 },
      type: "pickup",
    },
    "portableBlock@11,1,0": {
      config: { style: "sticks" },
      position: { x: 11, y: 1, z: 0 },
      type: "portableBlock",
    },
    "teleporter@0,4,4": {
      config: { toPosition: { x: 0, y: 3, z: 4 }, toRoom: "penitentiary30" },
      position: { x: 0, y: 4, z: 4 },
      type: "teleporter",
    },
    "teleporter@15,4,4": {
      config: {
        toPosition: { x: 7, y: 5, z: 4 },
        toRoom: "penitentiary34crown",
      },
      position: { x: 15, y: 4, z: 4 },
      type: "teleporter",
    },
    "wall@0,0,0:2sckiP": {
      config: { direction: "right", tiles: [], times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoEJK": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
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
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
        ],
        times: { x: 16 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@16,0,0": {
      config: { direction: "left", tiles: ["loop", "loop"], times: { y: 2 } },
      position: { x: 16, y: 0, z: 0 },
      type: "wall",
    },
    "wall@16,4,0": {
      config: { direction: "left", tiles: ["loop", "loop"], times: { y: 2 } },
      position: { x: 16, y: 4, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 11 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  size: { x: 16, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
