import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "safari13",
  items: {
    b: {
      config: { style: "organic", times: { y: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    b2: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 3, y: 5, z: 0 },
      type: "block",
    },
    b4: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "safari14" },
      position: { x: 0, y: 0, z: 1 },
      type: "door",
    },
    d1: {
      config: {
        direction: "away",
        meta: { toSubRoom: "left" },
        toRoom: "safari15",
      },
      position: { x: 3, y: 6, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "none", times: { x: 8, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "right", times: { y: 4 } },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["wall", "shield", "wall"] },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["wall", "window", "wall"] },
      position: { x: 5, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
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
