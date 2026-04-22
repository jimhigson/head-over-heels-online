import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "safari18",
  items: {
    b: {
      config: { style: "organic", times: { y: 4 } },
      position: { x: 0, y: 0, z: 2 },
      type: "block",
    },
    b1: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 1, y: 10, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 1, y: 11, z: 0 },
      type: "block",
    },
    b3: {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { y: 3 },
      },
      position: { x: 1, y: 12, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic" },
      position: { x: 1, y: 15, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "organic", times: { y: 5 } },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    b6: {
      config: { style: "tower", times: { y: 4, z: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "safari4" },
      position: { x: 0, y: 0, z: 3 },
      type: "door",
    },
    d1: {
      config: {
        direction: "away",
        meta: { toSubRoom: "middle" },
        toRoom: "safari19triple",
      },
      position: { x: 0, y: 16, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 2, y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "right", times: { y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
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
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 2, y: 8 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 8 }, to: { x: 2, y: 16 } },
      },
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
