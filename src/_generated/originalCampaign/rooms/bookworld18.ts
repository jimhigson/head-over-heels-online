import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "bookworld18",
  items: {
    b: {
      config: { disappearing: { on: "stand" }, style: "book", times: { z: 4 } },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    b1: {
      config: { disappearing: { on: "stand" }, style: "book", times: { z: 2 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "book", times: { x: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "book" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "bookworld19" },
      position: { x: 2, y: 0, z: 2 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "bookworld16" },
      position: { x: 2, y: 8, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 6, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["book", "book"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["book", "book"] },
      position: { x: 4, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
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
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
