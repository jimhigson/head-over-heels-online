import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  id: "bookworld9",
  items: {
    "door@0,1,0": {
      config: { direction: "right", toRoom: "bookworld10" },
      position: { x: 0, y: 1, z: 0 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "bookworld21" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@8,1,0": {
      config: { direction: "left", toRoom: "bookworld8" },
      position: { x: 8, y: 1, z: 0 },
      type: "door",
    },
    "slidingBlock@3,2,0": {
      config: { style: "book" },
      position: { x: 3, y: 2, z: 0 },
      type: "slidingBlock",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,3,0": {
      config: { direction: "right" },
      position: { x: 0, y: 3, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
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
        times: { x: 8 },
      },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["book"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,3,0": {
      config: { direction: "left", tiles: ["book"] },
      position: { x: 8, y: 3, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 4 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
