import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "penitentiary29",
  items: {
    "block@2,0,0": {
      config: { style: "organic", times: { x: 6, y: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "door@8,0,3": {
      config: { direction: "left", toRoom: "penitentiary28" },
      position: { x: 8, y: 0, z: 3 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "none", times: { x: 8, y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "slidingDeadly@2,0,1": {
      config: { startingPhase: 2, style: "spikyBall" },
      position: { x: 2, y: 0, z: 1 },
      type: "slidingDeadly",
    },
    "slidingDeadly@2,1,1": {
      config: { startingPhase: 1, style: "spikyBall" },
      position: { x: 2, y: 1, z: 1 },
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
  },
  planet: "penitentiary",
  roomBelow: "penitentiary31",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
