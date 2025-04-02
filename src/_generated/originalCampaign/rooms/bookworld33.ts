import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "bookworld",
  id: "bookworld33",
  items: {
    "door@0,3,0": {
      config: { direction: "right", toRoom: "bookworld35" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,8,4": {
      config: {
        direction: "away",
        meta: { toSubRoom: "left" },
        toRoom: "bookworld34",
      },
      position: { x: 3, y: 8, z: 4 },
      type: "door",
    },
    "hushPuppy@1,7,0": {
      config: {},
      position: { x: 1, y: 7, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@2,7,1": {
      config: {},
      position: { x: 2, y: 7, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@3,7,2": {
      config: {},
      position: { x: 3, y: 7, z: 2 },
      type: "hushPuppy",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
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
  roomAbove: "bookworld32",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
