import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "blacktooth84",
  items: {
    b: {
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    b2: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    b3: {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { z: 2 },
      },
      position: { x: 4, y: 3, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "tower", times: { y: 2, z: 3 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth85" },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth77" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pr: {
      config: { style: "cube" },
      position: { x: 4, y: 7, z: 0 },
      type: "portableBlock",
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
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
