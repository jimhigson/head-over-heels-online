import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "bookworld24",
  items: {
    "block@0,2,0": {
      config: { style: "book", times: { y: 2 } },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    "block@3,2,0": {
      config: { style: "book" },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    "deadlyBlock@0,0,1": {
      config: { style: "toaster" },
      position: { x: 0, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,2,0": {
      config: { style: "toaster" },
      position: { x: 4, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,5,1": {
      config: { style: "toaster" },
      position: { x: 5, y: 5, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,0,1": {
      config: { style: "toaster" },
      position: { x: 7, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,5,0": {
      config: { style: "toaster" },
      position: { x: 7, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,2": {
      config: { direction: "right", toRoom: "bookworld25" },
      position: { x: 0, y: 2, z: 2 },
      type: "door",
    },
    "door@8,2,2": {
      config: { direction: "left", toRoom: "bookworld23" },
      position: { x: 8, y: 2, z: 2 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "deadly", times: { x: 8, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "movingPlatform@7,2,0": {
      config: {
        activated: "on-stand",
        movement: "clockwise",
        startDirection: "right",
      },
      position: { x: 7, y: 2, z: 0 },
      type: "movingPlatform",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
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
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["book", "book"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,4,0": {
      config: { direction: "left", tiles: ["book", "book"] },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
