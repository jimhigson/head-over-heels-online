import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "bookworld1",
  items: {
    "block@0,3,0": {
      config: { style: "book", times: { z: 2 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,3,3": {
      config: { style: "book" },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    "door@0,3,4": {
      config: {
        direction: "right",
        meta: { toSubRoom: "left" },
        toRoom: "bookworld2",
      },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "bookworld7" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    extraLanding: {
      config: { style: "book", times: { z: 4 } },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "teleporter@6,3,0": {
      config: {
        times: { x: 2, y: 2 },
        toPosition: { x: 6, y: 3, z: 0 },
        toRoom: "moonbase25tobookworld",
      },
      position: { x: 6, y: 3, z: 0 },
      type: "teleporter",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
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
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
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
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
