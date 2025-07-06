import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "penitentiary31",
  items: {
    "block@0,0,0": {
      config: { style: "organic", times: { x: 6, y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "floor@0,0,0": {
      config: { floorType: "none", times: { x: 8, y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "portableBlock@1,1,1": {
      config: { style: "sticks" },
      position: { x: 1, y: 1, z: 1 },
      type: "portableBlock",
    },
    "slidingDeadly@5,0,1": {
      config: { startingPhase: 2, style: "spikyBall" },
      position: { x: 5, y: 0, z: 1 },
      type: "slidingDeadly",
    },
    "slidingDeadly@5,0,2": {
      config: { startingPhase: 1, style: "spikyBall" },
      position: { x: 5, y: 0, z: 2 },
      type: "slidingDeadly",
    },
    "slidingDeadly@5,1,1": {
      config: { startingPhase: 1, style: "spikyBall" },
      position: { x: 5, y: 1, z: 1 },
      type: "slidingDeadly",
    },
    "slidingDeadly@5,1,2": {
      config: { startingPhase: 2, style: "spikyBall" },
      position: { x: 5, y: 1, z: 2 },
      type: "slidingDeadly",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
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
      },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["loop", "loop"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary29",
  roomBelow: "penitentiary32",
  size: { x: 8, y: 2 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
