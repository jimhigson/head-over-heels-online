import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "bookworld",
  id: "bookworld4",
  items: {
    "block@0,7,0": {
      config: { style: "book", times: { z: 2 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "door@0,0,0": {
      config: { direction: "towards", toRoom: "bookworld5" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,4": {
      config: { direction: "away", toRoom: "bookworld12fish" },
      position: { x: 0, y: 8, z: 4 },
      type: "door",
    },
    "door@2,3,4": {
      config: { direction: "left", toRoom: "bookworld3" },
      position: { x: 2, y: 3, z: 4 },
      type: "door",
    },
    "wall@0,0,0": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@2,0,0": {
      config: {
        direction: "left",
        tiles: ["book", "book", "cowboy"],
        times: { y: 3 },
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
    "wall@2,5,0": {
      config: {
        direction: "left",
        tiles: ["cowboy", "book", "book"],
        times: { y: 3 },
      },
      position: { x: 2, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 2, y: 8 },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
