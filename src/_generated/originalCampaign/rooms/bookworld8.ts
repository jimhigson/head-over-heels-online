import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "bookworld8",
  items: {
    b: {
      config: { style: "book" },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "book", times: { z: 2 } },
      position: { x: 0, y: 2, z: 2 },
      type: "block",
    },
    b2: {
      config: { style: "book", times: { y: 3, z: 4 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "bookworld9" },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "bookworld7" },
      position: { x: 6, y: 8, z: 0 },
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
    pr: {
      config: { style: "cube" },
      position: { x: 3, y: 3, z: 0 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "cube" },
      position: { x: 4, y: 3, z: 0 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
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
        tiles: ["book", "cowboy", "book", "book", "cowboy", "book"],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
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
