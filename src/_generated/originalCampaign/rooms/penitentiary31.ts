import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "penitentiary31",
  items: {
    b: {
      config: { style: "organic", times: { x: 6, y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    f: {
      config: { floorType: "none", times: { x: 8, y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pr: {
      config: { style: "sticks" },
      position: { x: 1, y: 1, z: 1 },
      type: "portableBlock",
    },
    sd: {
      config: { startingPhase: 2, style: "spikyBall" },
      position: { x: 5, y: 0, z: 1 },
      type: "slidingDeadly",
    },
    sd1: {
      config: { startingPhase: 1, style: "spikyBall" },
      position: { x: 5, y: 0, z: 2 },
      type: "slidingDeadly",
    },
    sd2: {
      config: { startingPhase: 1, style: "spikyBall" },
      position: { x: 5, y: 1, z: 1 },
      type: "slidingDeadly",
    },
    sd3: {
      config: { startingPhase: 2, style: "spikyBall" },
      position: { x: 5, y: 1, z: 2 },
      type: "slidingDeadly",
    },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
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
    w3: {
      config: { direction: "left", tiles: ["loop", "loop"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary29",
  roomBelow: "penitentiary32",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
