import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  id: "bookworld34",
  items: {
    "block@0,10,0": {
      config: { style: "book", times: { x: 2 } },
      position: { x: 0, y: 10, z: 0 },
      type: "block",
    },
    "block@0,10,2": {
      config: { style: "book", times: { x: 2 } },
      position: { x: 0, y: 10, z: 2 },
      type: "block",
    },
    "block@0,13,0": {
      config: { style: "book" },
      position: { x: 0, y: 13, z: 0 },
      type: "block",
    },
    "block@0,4,0": {
      config: { style: "book", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@0,5,1": {
      config: { style: "book", times: { x: 2 } },
      position: { x: 0, y: 5, z: 1 },
      type: "block",
    },
    "block@0,5,3": {
      config: { style: "book", times: { x: 2, y: 5 } },
      position: { x: 0, y: 5, z: 3 },
      type: "block",
    },
    "block@1,10,1": {
      config: { style: "book" },
      position: { x: 1, y: 10, z: 1 },
      type: "block",
    },
    "block@1,10,3": {
      config: { style: "book" },
      position: { x: 1, y: 10, z: 3 },
      type: "block",
    },
    "block@1,5,0": {
      config: { style: "book" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@1,5,2": {
      config: { style: "book" },
      position: { x: 1, y: 5, z: 2 },
      type: "block",
    },
    "door@0,0,0": {
      config: { direction: "towards", toRoom: "bookworld33" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,16,0": {
      config: { direction: "away", toRoom: "bookworld20" },
      position: { x: 0, y: 16, z: 0 },
      type: "door",
    },
    "pickup@1,9,0": {
      config: { gives: "jumps" },
      position: { x: 1, y: 9, z: 0 },
      type: "pickup",
    },
    "slidingBlock@0,10,-1": {
      config: { style: "book" },
      position: { x: 0, y: 10, z: 1 },
      type: "slidingBlock",
    },
    "slidingBlock@0,13,-1": {
      config: { style: "book" },
      position: { x: 0, y: 13, z: 1 },
      type: "slidingBlock",
    },
    "slidingBlock@0,5,-1": {
      config: { style: "book" },
      position: { x: 0, y: 5, z: 2 },
      type: "slidingBlock",
    },
    "wall@0,0,0": {
      config: { direction: "right", tiles: [], times: { y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@2,0,0": {
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
        times: { y: 16 },
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 2, y: 16 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
