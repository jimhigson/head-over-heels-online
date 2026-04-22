import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "bookworld24",
  items: {
    b: {
      config: { style: "book", times: { y: 2 } },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "book" },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "bookworld25" },
      position: { x: 0, y: 2, z: 2 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "bookworld23" },
      position: { x: 8, y: 2, z: 2 },
      type: "door",
    },
    db: {
      config: { style: "toaster" },
      position: { x: 0, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "toaster" },
      position: { x: 4, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "toaster" },
      position: { x: 5, y: 5, z: 1 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "toaster" },
      position: { x: 7, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    db4: {
      config: { style: "toaster" },
      position: { x: 7, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    mp: {
      config: {
        activated: "on-stand",
        movement: "clockwise",
        startDirection: "right",
      },
      position: { x: 7, y: 2, z: 0 },
      type: "movingPlatform",
    },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
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
          "book",
          "cowboy",
          "book",
          "book",
          "cowboy",
          "book",
          "book",
        ],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["book", "book"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["book", "book"] },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
