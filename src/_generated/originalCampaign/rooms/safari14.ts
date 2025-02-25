import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "safari",
  id: "safari14",
  items: {
    "block@3,7,1": {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 3, y: 7, z: 1 },
      type: "block",
    },
    "block@4,6,0": {
      config: { style: "organic" },
      position: { x: 4, y: 6, z: 0 },
      type: "block",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "safari9" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "safari13" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "pickup@4,7,0": {
      config: { gives: "jumps" },
      position: { x: 4, y: 7, z: 0 },
      type: "pickup",
    },
    "portableBlock@4,7,2": {
      config: { style: "drum" },
      position: { x: 4, y: 7, z: 2 },
      type: "portableBlock",
    },
    "slidingDeadly@3,7,0": {
      config: { style: "puck" },
      position: { x: 3, y: 7, z: 0 },
      type: "slidingDeadly",
    },
    "slidingDeadly@5,7,0": {
      config: { style: "puck" },
      position: { x: 5, y: 7, z: 0 },
      type: "slidingDeadly",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["wall", "shield", "wall"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["wall", "window", "wall"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
