import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "penitentiary",
  id: "penitentiary32",
  items: {
    "block@2,0,4": {
      config: { style: "organic", times: { x: 6, y: 2 } },
      position: { x: 2, y: 0, z: 4 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "penitentiary33" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "monster@0,1,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 0, y: 1, z: 0 },
      type: "monster",
    },
    "slidingDeadly@2,0,5": {
      config: { style: "puck" },
      position: { x: 2, y: 0, z: 5 },
      type: "slidingDeadly",
    },
    "slidingDeadly@2,1,5": {
      config: { style: "puck" },
      position: { x: 2, y: 1, z: 5 },
      type: "slidingDeadly",
    },
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoEJK": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,2,0": {
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
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["loop", "loop"], times: { y: 2 } },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary35",
  size: { x: 8, y: 2 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
