import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "safari6triple",
  items: {
    b: {
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic" },
      position: { x: 0, y: 11, z: 0 },
      type: "block",
    },
    b10: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 3, y: 8, z: 0 },
      type: "block",
    },
    b11: {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 5, y: 2, z: 0 },
      type: "block",
    },
    b12: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    b13: {
      config: { style: "organic" },
      position: { x: 5, y: 6, z: 0 },
      type: "block",
    },
    b14: {
      config: { style: "organic" },
      position: { x: 5, y: 8, z: 0 },
      type: "block",
    },
    b15: {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    b16: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 8, y: 5, z: 0 },
      type: "block",
    },
    b17: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 9, y: 0, z: 0 },
      type: "block",
    },
    b18: {
      config: { style: "organic" },
      position: { x: 10, y: 5, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 1, y: 10, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic" },
      position: { x: 1, y: 8, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 10, y: 2, z: 0 },
      type: "block",
    },
    b6: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 10, y: 4, z: 0 },
      type: "block",
    },
    b7: {
      config: { style: "organic" },
      position: { x: 11, y: 0, z: 0 },
      type: "block",
    },
    b8: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    b9: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "safari5" },
      position: { x: 0, y: 2, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "safari7" },
      position: { x: 6, y: 8, z: 2 },
      type: "door",
    },
    d2: {
      config: { direction: "away", toRoom: "safari7" },
      position: { x: 8, y: 6, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 12, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    f1: {
      config: { floorType: "deadly", times: { x: 6, y: 6 } },
      position: { x: 0, y: 6, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "shield" },
      position: { x: 0, y: 11, z: 1 },
      type: "pickup",
    },
    w: {
      config: { direction: "away", tiles: ["wall", "shield"] },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "left", tiles: ["wall", "shield"] },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 13 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "away",
        tiles: ["shield", "wall", "window", "window", "wall", "shield"],
      },
      position: { x: 0, y: 12, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "right", times: { y: 9 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w6: {
      config: { direction: "away", tiles: ["shield", "wall"] },
      position: { x: 10, y: 6, z: 0 },
      type: "wall",
    },
    w7: {
      config: {
        direction: "left",
        tiles: ["shield", "wall", "window", "window", "wall", "shield"],
      },
      position: { x: 12, y: 0, z: 0 },
      type: "wall",
    },
    w8: {
      config: { direction: "left", tiles: ["shield", "wall"] },
      position: { x: 6, y: 10, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 1, y: 0 },
        physicalPosition: { from: { x: 6, y: 0 }, to: { x: 12, y: 6 } },
      },
      middle: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 6, y: 6 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 6 }, to: { x: 6, y: 12 } },
      },
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
