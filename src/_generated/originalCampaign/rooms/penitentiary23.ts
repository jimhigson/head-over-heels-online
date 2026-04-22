import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "penitentiary23",
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
    b2: {
      config: { style: "organic", times: { x: 7 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    b3: {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { y: 3 },
      },
      position: { x: 4, y: 4, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { y: 6 } },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    f: {
      config: { floorType: "none", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 0, top: 9 },
      position: { x: 4, y: 3, z: 0 },
      type: "lift",
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
  roomAbove: "penitentiary24",
  roomBelow: "penitentiary22",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
