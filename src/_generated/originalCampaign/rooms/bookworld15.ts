import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "bookworld15",
  items: {
    b: {
      config: { disappearing: { on: "stand" }, style: "book" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { disappearing: { on: "stand" }, style: "book" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    b2: {
      config: { disappearing: { on: "stand" }, style: "book" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "book", times: { x: 2 } },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "book" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "bookworld16" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "bookworld14" },
      position: { x: 3, y: 8, z: 3 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["book", "book", "cowboy"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["cowboy", "book", "book"] },
      position: { x: 5, y: 8, z: 0 },
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
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
