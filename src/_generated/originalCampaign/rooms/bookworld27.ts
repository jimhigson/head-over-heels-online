import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "bookworld27",
  items: {
    b: {
      config: { style: "book", times: { z: 2 } },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "book", times: { x: 2, y: 2 } },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    d: {
      config: {
        direction: "towards",
        meta: { toSubRoom: "right" },
        toRoom: "bookworld28",
      },
      position: { x: 0, y: 0, z: 4 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "bookworld23" },
      position: { x: 0, y: 8, z: 0 },
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
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
