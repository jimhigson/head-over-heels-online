import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  height: 12,
  id: "penitentiary21",
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
      config: { style: "organic" },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 0, y: 7, z: 6 },
      type: "block",
    },
    b3: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { x: 7 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 1, y: 7, z: 4 },
      type: "block",
    },
    b6: {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 3, y: 7, z: 2 },
      type: "block",
    },
    b7: {
      config: { style: "organic", times: { y: 6 } },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    b8: {
      config: { style: "organic" },
      position: { x: 7, y: 1, z: 3 },
      type: "block",
    },
    b9: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 2, z: 2 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "penitentiary19" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    f: {
      config: { floorType: "none", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "right",
        which: "turtle",
      },
      position: { x: 6, y: 7, z: 1 },
      type: "monster",
    },
    pr: {
      config: { style: "drum" },
      position: { x: 1, y: 6, z: 1 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
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
        ],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
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
  roomAbove: "penitentiary22",
  roomBelow: "penitentiary20",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
