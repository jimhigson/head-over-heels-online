import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "safari13",
  items: {
    "block@0,3,0": {
      config: { style: "organic", times: { y: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,5,0": {
      config: { style: "organic" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@1,5,0": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@3,5,0": {
      config: { style: "organic" },
      position: { x: 3, y: 5, z: 0 },
      type: "block",
    },
    "block@5,5,0": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    "block@7,5,0": {
      config: { style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "door@0,2,2": {
      config: { direction: "right", toRoom: "safari14" },
      position: { x: 0, y: 0, z: 1 },
      type: "door",
    },
    "door@3,6,2": {
      config: {
        direction: "away",
        meta: { toSubRoom: "left" },
        toRoom: "safari15",
      },
      position: { x: 3, y: 6, z: 2 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "none", times: { x: 8, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", times: { y: 4 } },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: { direction: "away", tiles: ["wall", "shield", "wall"] },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@5,6,0": {
      config: { direction: "away", tiles: ["wall", "window", "wall"] },
      position: { x: 5, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["shield", "wall", "window", "window", "wall", "shield"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  roomBelow: "safari12",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
