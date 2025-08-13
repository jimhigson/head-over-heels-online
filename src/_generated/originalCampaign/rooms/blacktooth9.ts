import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "blacktooth9",
  items: {
    "block@0,4,0": {
      config: { style: "organic", times: { z: 3 } },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@3,4,0": {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { z: 3 },
      },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    "block@3,7,0": {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { z: 3 },
      },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@7,0,0": {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@7,7,1": {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 7, y: 7, z: 1 },
      type: "block",
    },
    "door@8,3,2": {
      config: { direction: "left", toRoom: "blacktooth8fish" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "pickup@0,4,7": {
      config: { gives: "hooter" },
      position: { x: 0, y: 4, z: 7 },
      type: "pickup",
    },
    scroll: {
      config: { gives: "scroll", page: "hooter", source: "manual" },
      position: { x: 7, y: 1, z: 1 },
      type: "pickup",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
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
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
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
