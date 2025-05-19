import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "bookworld",
  id: "bookworld12fish",
  items: {
    "block@0,7,0": {
      config: { style: "book", times: { z: 5 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "bookworld13" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "bookworld4" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "pickup@0,7,5": {
      config: { gives: "reincarnation" },
      position: { x: 0, y: 7, z: 5 },
      type: "pickup",
    },
    "portableBlock@5,7,0": {
      config: { style: "cube" },
      position: { x: 5, y: 7, z: 0 },
      type: "portableBlock",
    },
    "pushableBlock@3,4,0": {
      config: { style: "stepStool" },
      position: { x: 3, y: 4, z: 0 },
      type: "pushableBlock",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["book", "cowboy", "book", "book", "cowboy", "book"],
        times: { x: 6 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
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
        times: { y: 8 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 6, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
