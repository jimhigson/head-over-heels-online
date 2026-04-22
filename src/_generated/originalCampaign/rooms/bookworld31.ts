import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "bookworld31",
  items: {
    d: {
      config: { direction: "right", toRoom: "bookworld32" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "bookworld30" },
      position: { x: 16, y: 2, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 12, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 5, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 16, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "away",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: { x: 11, y: 0, z: 0 },
      type: "monster",
    },
    pi: {
      config: { gives: "shield" },
      position: { x: 9, y: 2, z: 0 },
      type: "pickup",
    },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 16 } },
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
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["book", "book"] },
      position: { x: 16, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["book", "book"] },
      position: { x: 16, y: 4, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 1, y: 0 },
        physicalPosition: { from: { x: 8, y: 0 }, to: { x: 16, y: 6 } },
      },
      right: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 6 } },
      },
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
