import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "bookworld",
  id: "bookworld31",
  items: {
    "deadlyBlock@12,0,0": {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 12, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,0,0": {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,0,0": {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 5, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0": {
      config: { direction: "right", toRoom: "bookworld32" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@16,2,0": {
      config: { direction: "left", toRoom: "bookworld30" },
      position: { x: 16, y: 2, z: 0 },
      type: "door",
    },
    "monster@11,0,0": {
      config: {
        activated: true,
        movement: "clockwise",
        startDirection: "away",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: { x: 11, y: 0, z: 0 },
      type: "monster",
    },
    "pickup@9,2,0": {
      config: { gives: "shield" },
      position: { x: 9, y: 2, z: 0 },
      type: "pickup",
    },
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Za9wJp": {
      config: { direction: "towards", tiles: [], times: { x: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
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
        times: { x: 16 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@16,0,0": {
      config: { direction: "left", tiles: ["book", "book"], times: { y: 2 } },
      position: { x: 16, y: 0, z: 0 },
      type: "wall",
    },
    "wall@16,4,0": {
      config: { direction: "left", tiles: ["book", "book"], times: { y: 2 } },
      position: { x: 16, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 16, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
