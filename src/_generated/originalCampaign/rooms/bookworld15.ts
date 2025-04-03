import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "deadly",
  id: "bookworld15",
  items: {
    "block@0,0,0": {
      config: { disappearing: "onStand", style: "book" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,3,0": {
      config: { disappearing: "onStand", style: "book" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,7,0": {
      config: { disappearing: "onStand", style: "book" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@3,7,0": {
      config: { style: "book", times: { x: 2 } },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@4,0,0": {
      config: { style: "book" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "door@3,0,1": {
      config: { direction: "towards", toRoom: "bookworld16" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    "door@3,8,3": {
      config: { direction: "away", toRoom: "bookworld14" },
      position: { x: 3, y: 8, z: 3 },
      type: "door",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoEJK": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["book", "book", "cowboy"],
        times: { x: 3 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: {
        direction: "away",
        tiles: ["cowboy", "book", "book"],
        times: { x: 3 },
      },
      position: { x: 5, y: 8, z: 0 },
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
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
