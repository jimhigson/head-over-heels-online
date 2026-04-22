import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "blacktooth21fish",
  items: {
    b: {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    b4: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 6, y: 4, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "blacktooth20" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "blacktooth22" },
      position: { x: 3, y: 8, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "reincarnation" },
      position: { x: 7, y: 4, z: 3 },
      type: "pickup",
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
      config: { direction: "away", tiles: ["plain", "shield", "plain"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["plain", "shield", "plain"] },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
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
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
