import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  id: "bookworld6",
  items: {
    "block@1,3,0": {
      config: { style: "book" },
      position: { x: 1, y: 3, z: 0 },
      type: "block",
    },
    "block@1,7,0": {
      config: { style: "book" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "deadlyBlock@3,0,0": {
      config: { style: "toaster" },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@1,8,3": {
      config: { direction: "away", toRoom: "bookworld5" },
      position: { x: 1, y: 8, z: 3 },
      type: "door",
    },
    "door@4,3,3": {
      config: { direction: "left", toRoom: "bookworld11" },
      position: { x: 4, y: 3, z: 3 },
      type: "door",
    },
    "pushableBlock@2,4,0": {
      config: {},
      position: { x: 2, y: 4, z: 0 },
      type: "pushableBlock",
    },
    "pushableBlock@2,5,0": {
      config: {},
      position: { x: 2, y: 5, z: 0 },
      type: "pushableBlock",
    },
    "slidingBlock@1,3,1": {
      config: { style: "book" },
      position: { x: 1, y: 3, z: 1 },
      type: "slidingBlock",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["book"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@3,8,0": {
      config: { direction: "away", tiles: ["book"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: {
        direction: "left",
        tiles: ["book", "book", "cowboy"],
        times: { y: 3 },
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,5,0": {
      config: {
        direction: "left",
        tiles: ["cowboy", "book", "book"],
        times: { y: 3 },
      },
      position: { x: 4, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 4, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
