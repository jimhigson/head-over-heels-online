import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "bookworld3",
  items: {
    d: {
      config: { direction: "right", toRoom: "bookworld4" },
      position: { x: 0, y: 2, z: 2 },
      type: "door",
    },
    d1: {
      config: {
        direction: "left",
        meta: { toSubRoom: "right" },
        toRoom: "bookworld2",
      },
      position: { x: 8, y: 2, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 8, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy4",
        which: "monkey",
      },
      position: { x: 3, y: 5, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy4",
        which: "monkey",
      },
      position: { x: 4, y: 0, z: 0 },
      type: "monster",
    },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
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
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["book", "book"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["book", "book"] },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
