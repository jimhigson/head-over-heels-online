import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  height: 12,
  id: "penitentiary22",
  items: {
    b: {
      config: { style: "organic", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { y: 7 } },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    b10: {
      config: { style: "organic", times: { y: 6 } },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    b11: {
      config: { style: "tower" },
      position: { x: 0, y: 4, z: 1 },
      type: "block",
    },
    b12: {
      config: { style: "tower" },
      position: { x: 0, y: 4, z: 2 },
      type: "block",
    },
    b13: {
      config: { style: "tower" },
      position: { x: 0, y: 4, z: 3 },
      type: "block",
    },
    b14: {
      config: { style: "tower" },
      position: { x: 0, y: 4, z: 4 },
      type: "block",
    },
    b15: {
      config: { style: "tower" },
      position: { x: 0, y: 4, z: 5 },
      type: "block",
    },
    b16: {
      config: { style: "tower" },
      position: { x: 0, y: 4, z: 6 },
      type: "block",
    },
    b2: {
      config: { style: "artificial" },
      position: { x: 0, y: 4, z: 7 },
      type: "block",
    },
    b3: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 1, y: 4, z: 6 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { x: 7 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    b5: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 2, y: 4, z: 5 },
      type: "block",
    },
    b6: {
      config: { style: "artificial", times: { x: 2 } },
      position: { x: 3, y: 4, z: 4 },
      type: "block",
    },
    b7: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 4, y: 1, z: 1 },
      type: "block",
    },
    b8: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 4, y: 2, z: 2 },
      type: "block",
    },
    b9: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 4, y: 3, z: 3 },
      type: "block",
    },
    f: {
      config: { floorType: "none", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "extra-life" },
      position: { x: 4, y: 4, z: 5 },
      type: "pickup",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
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
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
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
  roomAbove: "penitentiary23",
  roomBelow: "penitentiary21",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
