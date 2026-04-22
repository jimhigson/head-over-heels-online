import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "blacktooth9",
  items: {
    b: {
      config: { style: "organic", times: { z: 3 } },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    b1: {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { z: 3 },
      },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    b2: {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { z: 3 },
      },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 7, y: 7, z: 1 },
      type: "block",
    },
    d: {
      config: { direction: "left", toRoom: "blacktooth8fish" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "hooter" },
      position: { x: 0, y: 4, z: 7 },
      type: "pickup",
    },
    pi1: {
      config: { gives: "scroll", page: "hooter", source: "manual" },
      position: { x: 7, y: 1, z: 1 },
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
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  meta: {
    nonContiguousRelationship: {
      gridOffset: { x: -4, y: -7, z: 0 },
      with: { room: "blacktooth1head" },
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
