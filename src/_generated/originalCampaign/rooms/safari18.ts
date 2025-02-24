import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "deadly",
  id: "safari18",
  items: {
    "block@0,0,2": {
      config: { style: "organic", times: { y: 4 } },
      position: { x: 0, y: 0, z: 2 },
      type: "block",
    },
    "block@1,10,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 1, y: 10, z: 0 },
      type: "block",
    },
    "block@1,11,0": {
      config: { style: "organic" },
      position: { x: 1, y: 11, z: 0 },
      type: "block",
    },
    "block@1,12,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 1, y: 12, z: 0 },
      type: "block",
    },
    "block@1,13,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 1, y: 13, z: 0 },
      type: "block",
    },
    "block@1,14,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 1, y: 14, z: 0 },
      type: "block",
    },
    "block@1,15,0": {
      config: { style: "organic" },
      position: { x: 1, y: 15, z: 0 },
      type: "block",
    },
    "block@1,5,0": {
      config: { style: "organic", times: { y: 5 } },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "door@0,0,3": {
      config: { direction: "towards", toRoom: "safari4" },
      position: { x: 0, y: 0, z: 3 },
      type: "door",
    },
    "door@0,16,2": {
      config: { direction: "away", toRoom: "safari19triple" },
      position: { x: 0, y: 16, z: 2 },
      type: "door",
    },
    "wall@0,0,0": {
      config: { direction: "right", tiles: [], times: { y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@2,0,0": {
      config: {
        direction: "left",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
        times: { y: 16 },
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 2, y: 16 },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
