import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "bookworld22",
  items: {
    b: {
      config: { disappearing: { on: "stand" }, style: "book" },
      position: { x: 0, y: 0, z: 2 },
      type: "block",
    },
    b1: {
      config: { style: "book", times: { x: 2, z: 2 } },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "book" },
      position: { x: 1, y: 0, z: 3 },
      type: "block",
    },
    b3: {
      config: { style: "book" },
      position: { x: 1, y: 1, z: 2 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "bookworld23" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "bookworld21" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "toaster" },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 2, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "shield" },
      position: { x: 1, y: 0, z: 0 },
      type: "pickup",
    },
    pr: {
      config: { style: "sticks" },
      position: { x: 0, y: 6.5, z: 0 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "left",
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
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
