import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "bookworld36",
  items: {
    b: {
      config: { style: "book", times: { z: 3 } },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "away", toRoom: "bookworld37" },
      position: { x: 3, y: 6, z: 5 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "bookworld35" },
      position: { x: 8, y: 2, z: 5 },
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
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 1, y: 0, z: 0 },
      type: "monster",
    },
    pr: {
      config: { style: "sticks" },
      position: { x: 1, y: 5, z: 0 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "sticks" },
      position: { x: 3, y: 1, z: 0 },
      type: "portableBlock",
    },
    pr2: {
      config: { style: "sticks" },
      position: { x: 4, y: 3, z: 0 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["book", "book", "cowboy"] },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["cowboy", "book", "book"] },
      position: { x: 5, y: 6, z: 0 },
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
