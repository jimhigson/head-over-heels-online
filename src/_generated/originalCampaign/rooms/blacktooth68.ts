import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "blacktooth68",
  items: {
    b: {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { z: 3 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { z: 3 },
      },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    b2: {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { z: 3 },
      },
      position: { x: 2, y: 7, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 3, z: 3 },
      type: "block",
    },
    b5: {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { z: 3 },
      },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    b6: {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    b7: {
      config: { style: "tower", times: { y: 2, z: 3 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "blacktooth66" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth76" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
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
    w3: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
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
