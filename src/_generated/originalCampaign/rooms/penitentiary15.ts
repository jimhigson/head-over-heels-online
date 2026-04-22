import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  height: 12,
  id: "penitentiary15",
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
      position: { x: 7, y: 7, z: 3 },
      type: "block",
    },
    b11: {
      config: { style: "organic", times: { y: 4 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 1, y: 1, z: 1 },
      type: "block",
    },
    b3: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 1, y: 2, z: 1 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { x: 7 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 7 },
      type: "block",
    },
    b6: {
      config: { style: "organic" },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    b7: {
      config: { style: "organic" },
      position: { x: 7, y: 1, z: 6 },
      type: "block",
    },
    b8: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 2, z: 5 },
      type: "block",
    },
    b9: {
      config: { style: "organic", times: { y: 3 } },
      position: { x: 7, y: 4, z: 4 },
      type: "block",
    },
    f: {
      config: { floorType: "none", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 0, top: 0 },
      position: { x: 7, y: 2, z: 0 },
      type: "lift",
    },
    m: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "right",
        which: "turtle",
      },
      position: { x: 7, y: 7, z: 1 },
      type: "monster",
    },
    pr: {
      config: { style: "cube" },
      position: { x: 1, y: 1, z: 2 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "cube" },
      position: { x: 1, y: 1, z: 3 },
      type: "portableBlock",
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
  roomAbove: "penitentiary16",
  roomBelow: "penitentiary14",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
