import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "bookworld29",
  items: {
    "block@0,0,0": {
      config: { style: "organic", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,1,0": {
      config: { style: "organic", times: { y: 7 } },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "block@1,7,0": {
      config: { style: "organic", times: { x: 7 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@7,1,0": {
      config: { style: "organic", times: { y: 6 } },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "door@0,3,3": {
      config: { direction: "right", toRoom: "bookworld30" },
      position: { x: 0, y: 3, z: 3 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "none", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "lift@3,3,0": {
      config: { bottom: -7, top: 6 },
      position: { x: 3, y: 3, z: 0 },
      type: "lift",
    },
    patroller: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "left",
        which: "turtle",
      },

      position: { x: 0, y: 0, z: 1 },
      type: "monster",
    },
    patroller2: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "right",
        which: "turtle",
      },

      position: { x: 7, y: 7, z: 1 },
      type: "monster",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
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
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
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
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  roomBelow: "bookworld28",
  size: { x: 8, y: 8 },
  subRoomBelow: "left",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
