import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  id: "bookworld2",
  items: {
    b: {
      config: { style: "organic", times: { y: 3 } },
      position: { x: 11, y: 0, z: 0 },
      type: "block",
    },
    co: {
      config: { direction: "away", times: { y: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "conveyor",
    },
    co1: {
      config: { direction: "right" },
      position: { x: 1, y: 0, z: 0 },
      type: "conveyor",
    },
    co10: {
      config: { direction: "right", disappearing: { on: "stand" } },
      position: { x: 9, y: 5, z: 0 },
      type: "conveyor",
    },
    co2: {
      config: { direction: "right", times: { x: 2 } },
      position: { x: 10, y: 5, z: 0 },
      type: "conveyor",
    },
    co3: {
      config: { direction: "away", times: { y: 2 } },
      position: { x: 11, y: 3, z: 0 },
      type: "conveyor",
    },
    co4: {
      config: { direction: "right", disappearing: { on: "stand" } },
      position: { x: 2, y: 0, z: 0 },
      type: "conveyor",
    },
    co5: {
      config: { direction: "right", times: { x: 2 } },
      position: { x: 3, y: 0, z: 0 },
      type: "conveyor",
    },
    co6: {
      config: { direction: "towards", times: { y: 2 } },
      position: { x: 4, y: 1, z: 0 },
      type: "conveyor",
    },
    co7: {
      config: { direction: "towards", disappearing: { on: "stand" } },
      position: { x: 4, y: 3, z: 0 },
      type: "conveyor",
    },
    co8: {
      config: { direction: "towards", times: { y: 2 } },
      position: { x: 4, y: 4, z: 0 },
      type: "conveyor",
    },
    co9: {
      config: { direction: "right", times: { x: 4 } },
      position: { x: 5, y: 5, z: 0 },
      type: "conveyor",
    },
    d: {
      config: { direction: "right", toRoom: "bookworld3" },
      position: { x: 0, y: 2, z: 3 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "bookworld1" },
      position: { x: 12, y: 0, z: 5 },
      type: "door",
    },
    db: {
      config: { style: "toaster", times: { y: 2 } },
      position: { x: 0, y: 0, z: 2 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "toaster", times: { y: 2 } },
      position: { x: 11, y: 4, z: 2 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "toaster", times: { y: 2 } },
      position: { x: 4, y: 0, z: 2 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "toaster", times: { x: 4 } },
      position: { x: 4, y: 5, z: 2 },
      type: "deadlyBlock",
    },
    f: {
      config: { floorType: "deadly", times: { x: 12, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pr: {
      config: { style: "cube" },
      position: { x: 11, y: 2, z: 1 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "cube" },
      position: { x: 11, y: 2, z: 2 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 12 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: [
          "book",
          "cowboy",
          "book",
          "book",
          "cowboy",
          "book",
          "book",
          "cowboy",
          "book",
          "book",
          "cowboy",
          "book",
        ],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["book", "book", "book", "book"] },
      position: { x: 12, y: 2, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 1, y: 0 },
        physicalPosition: { from: { x: 6, y: 0 }, to: { x: 12, y: 6 } },
      },
      right: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 6, y: 6 } },
      },
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
