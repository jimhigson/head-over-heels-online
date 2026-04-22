import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "bookworld14",
  items: {
    br: {
      config: { axis: "y", times: { y: 4, z: 3 } },
      position: { x: 6.4, y: 2.8, z: 0 },
      type: "barrier",
    },
    br1: {
      config: { axis: "x", times: { z: 3 } },
      position: { x: 7, y: 2.4, z: 0 },
      type: "barrier",
    },
    d: {
      config: { direction: "towards", toRoom: "bookworld15" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "bookworld13" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "toaster" },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "toaster" },
      position: { x: 4, y: 3, z: 0 },
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
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 4, y: 4, z: 0 },
      type: "monster",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
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
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["book", "book", "cowboy"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["cowboy", "book", "book"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
