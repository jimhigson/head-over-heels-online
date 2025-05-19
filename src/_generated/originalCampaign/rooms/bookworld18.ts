import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "deadly",
  id: "bookworld18",
  items: {
    "block@0,5,0": {
      config: { disappearing: "onStand", style: "book" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@0,5,1": {
      config: { disappearing: "onStand", style: "book" },
      position: { x: 0, y: 5, z: 1 },
      type: "block",
    },
    "block@0,5,2": {
      config: { disappearing: "onStand", style: "book" },
      position: { x: 0, y: 5, z: 2 },
      type: "block",
    },
    "block@0,5,3": {
      config: { disappearing: "onStand", style: "book" },
      position: { x: 0, y: 5, z: 3 },
      type: "block",
    },
    "block@0,7,0": {
      config: { disappearing: "onStand", style: "book" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@0,7,1": {
      config: { disappearing: "onStand", style: "book" },
      position: { x: 0, y: 7, z: 1 },
      type: "block",
    },
    "block@2,0,0": {
      config: { style: "book", times: { x: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@3,7,0": {
      config: { style: "book" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "door@2,0,2": {
      config: { direction: "towards", toRoom: "bookworld19" },
      position: { x: 2, y: 0, z: 2 },
      type: "door",
    },
    "door@2,8,2": {
      config: { direction: "away", toRoom: "bookworld16" },
      position: { x: 2, y: 8, z: 2 },
      type: "door",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["book", "book"], times: { x: 2 } },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,8,0": {
      config: { direction: "away", tiles: ["book", "book"], times: { x: 2 } },
      position: { x: 4, y: 8, z: 0 },
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
