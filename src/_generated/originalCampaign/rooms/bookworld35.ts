import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "bookworld35",
  items: {
    b: {
      config: { style: "book", times: { x: 3, z: 4 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 5, y: 1, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "book", times: { z: 5 } },
      position: { x: 5, y: 7, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic" },
      position: { x: 6, y: 2, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "book", times: { y: 2, z: 5 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    ch: { config: {}, position: { x: 5, y: 7, z: 5 }, type: "charles" },
    d: {
      config: { direction: "right", toRoom: "bookworld36" },
      position: { x: 0, y: 0, z: 5 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "bookworld33" },
      position: { x: 8, y: 5, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { z: 3 } },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano" },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "volcano", times: { z: 4 } },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
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
    j: { config: {}, position: { x: 5, y: 1, z: 1 }, type: "joystick" },
    j1: { config: {}, position: { x: 6, y: 0, z: 1 }, type: "joystick" },
    j2: { config: {}, position: { x: 6, y: 2, z: 1 }, type: "joystick" },
    j3: { config: {}, position: { x: 7, y: 1, z: 1 }, type: "joystick" },
    sg: { config: {}, position: { x: 1, y: 7, z: 4 }, type: "spring" },
    w: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
    w2: {
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
    w3: {
      config: {
        direction: "left",
        tiles: ["book", "book", "book", "book", "cowboy"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["cowboy"] },
      position: { x: 8, y: 7, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
