import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "penitentiary18fish",
  items: {
    b: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 4, z: 3 },
      type: "block",
    },
    b1: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 14, y: 4, z: 3 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 15, y: 4, z: 3 },
      type: "block",
    },
    b3: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 6, y: 4, z: 3 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { x: 7 } },
      position: { x: 7, y: 4, z: 3 },
      type: "block",
    },
    b5: {
      config: { style: "tower", times: { x: 2, z: 3 } },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    b6: {
      config: { style: "tower", times: { x: 2, z: 3 } },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    b7: {
      config: { style: "tower", times: { x: 2, z: 3 } },
      position: { x: 14, y: 4, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "left", toRoom: "penitentiary12" },
      position: { x: 16, y: 2, z: 2 },
      type: "door",
    },
    d1: {
      config: { direction: "towards", toRoom: "penitentiary17" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 16, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "reincarnation" },
      position: { x: 12, y: 4, z: 4 },
      type: "pickup",
    },
    pi1: {
      config: { gives: "shield" },
      position: { x: 15, y: 5, z: 3 },
      type: "pickup",
    },
    pr: {
      config: { style: "sticks" },
      position: { x: 11, y: 1, z: 0 },
      type: "portableBlock",
    },
    t: {
      config: { toRoom: "penitentiary30" },
      position: { x: 0, y: 4, z: 4 },
      type: "teleporter",
    },
    t1: {
      config: { toRoom: "penitentiary34crown" },
      position: { x: 15, y: 4, z: 4 },
      type: "teleporter",
    },
    w: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 3 } },
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
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "left", tiles: ["loop", "loop"] },
      position: { x: 16, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["loop", "loop"] },
      position: { x: 16, y: 4, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "towards", times: { x: 11 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 1, y: 0 },
        physicalPosition: { from: { x: 8, y: 0 }, to: { x: 16, y: 6 } },
      },
      right: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 6 } },
      },
    },
  },
  planet: "penitentiary",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
