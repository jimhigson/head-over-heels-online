import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "bookworld4",
  items: {
    b: {
      config: { style: "book", times: { z: 2 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "bookworld5" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "bookworld12fish" },
      position: { x: 0, y: 8, z: 4 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "bookworld3" },
      position: { x: 2, y: 3, z: 4 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 2, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "left", tiles: ["book", "book", "cowboy"] },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "left", tiles: ["cowboy", "book", "book"] },
      position: { x: 2, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
