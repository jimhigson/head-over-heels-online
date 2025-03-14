import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "deadly",
  id: "blacktooth35",
  items: {
    "block@1,0,0": {
      config: { style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@1,10,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 1, y: 10, z: 0 },
      type: "block",
    },
    "block@1,12,0": {
      config: { style: "organic" },
      position: { x: 1, y: 12, z: 0 },
      type: "block",
    },
    "block@1,6,0": {
      config: { style: "organic" },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    "block@1,7,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@1,8,0": {
      config: { style: "organic" },
      position: { x: 1, y: 8, z: 0 },
      type: "block",
    },
    "block@3,12,0": {
      config: { style: "organic" },
      position: { x: 3, y: 12, z: 0 },
      type: "block",
    },
    "door@1,0,1": {
      config: { direction: "towards", toRoom: "blacktooth34" },
      position: { x: 1, y: 0, z: 1 },
      type: "door",
    },
    "door@4,11,2": {
      config: { direction: "left", toRoom: "blacktooth36" },
      position: { x: 4, y: 11, z: 2 },
      type: "door",
    },
    "spring@1,2,0": {
      config: {},
      position: { x: 1, y: 2, z: 0 },
      type: "spring",
    },
    "spring@1,4,0": {
      config: {},
      position: { x: 1, y: 4, z: 0 },
      type: "spring",
    },
    "wall@0,0,0:3gbWw": {
      config: { direction: "right", tiles: [], times: { y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1fRqC7": {
      config: { direction: "towards", tiles: [] },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,16,0": {
      config: {
        direction: "away",
        tiles: ["plain", "shield", "shield", "plain"],
        times: { x: 4 },
      },
      position: { x: 0, y: 16, z: 0 },
      type: "wall",
    },
    "wall@3,0,0": {
      config: { direction: "towards", tiles: [] },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
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
          "plain",
          "shield",
          "plain",
        ],
        times: { y: 11 },
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,13,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "plain"],
        times: { y: 3 },
      },
      position: { x: 4, y: 13, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 4, y: 16 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
