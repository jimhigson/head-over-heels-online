import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "bookworld1",
  items: {
    b: {
      config: { style: "book", times: { z: 2 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "book" },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    b2: {
      config: { style: "book", times: { z: 4 } },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    d: {
      config: {
        direction: "right",
        meta: { toSubRoom: "left" },
        toRoom: "bookworld2",
      },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    d1: {
      config: { direction: "towards", toRoom: "bookworld7" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    t: {
      config: { times: { x: 2, y: 2 }, toRoom: "moonbase25tobookworld" },
      position: { x: 6, y: 3, z: 0 },
      type: "teleporter",
    },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    w3: {
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
    w4: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
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
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
