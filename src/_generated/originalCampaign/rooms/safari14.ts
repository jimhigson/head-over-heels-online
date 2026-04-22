import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "safari14",
  items: {
    b: {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 3, y: 7, z: 1 },
      type: "block",
    },
    b1: {
      config: { style: "organic" },
      position: { x: 4, y: 6, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "safari9" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "safari13" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "jumps" },
      position: { x: 4, y: 7, z: 0 },
      type: "pickup",
    },
    pr: {
      config: { style: "drum" },
      position: { x: 4, y: 7, z: 2 },
      type: "portableBlock",
    },
    sd: {
      config: { startingPhase: 1, style: "spikyBall" },
      position: { x: 3, y: 7, z: 0 },
      type: "slidingDeadly",
    },
    sd1: {
      config: { startingPhase: 1, style: "spikyBall" },
      position: { x: 5, y: 7, z: 0 },
      type: "slidingDeadly",
    },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["wall", "shield", "wall"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["wall", "window", "wall"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
