import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "bookworld34",
  items: {
    b: {
      config: { style: "book", times: { x: 2 } },
      position: { x: 0, y: 10, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "book", times: { x: 2 } },
      position: { x: 0, y: 10, z: 2 },
      type: "block",
    },
    b2: {
      config: { style: "book" },
      position: { x: 0, y: 13, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "book", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "book", times: { x: 2 } },
      position: { x: 0, y: 5, z: 1 },
      type: "block",
    },
    b5: {
      config: { style: "book", times: { x: 2, y: 5 } },
      position: { x: 0, y: 5, z: 3 },
      type: "block",
    },
    b6: {
      config: { style: "book" },
      position: { x: 1, y: 10, z: 1 },
      type: "block",
    },
    b7: {
      config: { style: "book" },
      position: { x: 1, y: 10, z: 3 },
      type: "block",
    },
    b8: {
      config: { style: "book" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    b9: {
      config: { style: "book" },
      position: { x: 1, y: 5, z: 2 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "bookworld33" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "bookworld20" },
      position: { x: 0, y: 16, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 2, y: 16 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "jumps" },
      position: { x: 1, y: 9, z: 0 },
      type: "pickup",
    },
    sb: {
      config: { style: "book" },
      position: { x: 0, y: 10, z: 1 },
      type: "slidingBlock",
    },
    sb1: {
      config: { style: "book" },
      position: { x: 0, y: 13, z: 1 },
      type: "slidingBlock",
    },
    sb2: {
      config: { style: "book" },
      position: { x: 0, y: 5, z: 2 },
      type: "slidingBlock",
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
          "book",
          "cowboy",
          "book",
          "book",
          "book",
          "book",
          "cowboy",
          "book",
          "book",
          "cowboy",
          "book",
          "book",
          "book",
          "book",
          "cowboy",
          "book",
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
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
