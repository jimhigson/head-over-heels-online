import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "bookworld11",
  items: {
    d: {
      config: { direction: "right", toRoom: "bookworld6" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "bookworld10" },
      position: { x: 8, y: 0, z: 4 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 8, y: 2 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    h: {
      config: { times: { y: 2 } },
      position: { x: 5, y: 0, z: 0 },
      type: "hushPuppy",
    },
    h1: {
      config: { times: { y: 2 } },
      position: { x: 6, y: 0, z: 1 },
      type: "hushPuppy",
    },
    h2: {
      config: { times: { y: 2 } },
      position: { x: 7, y: 0, z: 2 },
      type: "hushPuppy",
    },
    w: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
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
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
