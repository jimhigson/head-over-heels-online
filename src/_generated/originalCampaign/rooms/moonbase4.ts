import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "moonbase4",
  items: {
    b: {
      config: { style: "artificial", times: { z: 2 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "artificial", times: { x: 2 } },
      position: { x: 0, y: 7, z: 3 },
      type: "block",
    },
    b2: {
      config: { style: "artificial" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "artificial" },
      position: { x: 7, y: 1, z: 1 },
      type: "block",
    },
    b4: {
      config: { style: "artificial" },
      position: { x: 7, y: 2, z: 2 },
      type: "block",
    },
    b5: {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 7, y: 3, z: 3 },
      type: "block",
    },
    d: {
      config: { direction: "away", toRoom: "moonbase5" },
      position: { x: 0, y: 8, z: 4 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "moonbase1" },
      position: { x: 8, y: 3, z: 4 },
      type: "door",
    },
    db: {
      config: { style: "volcano" },
      position: { x: 1, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano" },
      position: { x: 1, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 2, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 3, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    db4: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 3, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    db5: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 5, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    db6: {
      config: { style: "volcano" },
      position: { x: 6, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db7: {
      config: { style: "volcano" },
      position: { x: 6, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy4-and-reverse",
        which: "computerBot",
      },
      position: { x: 2, y: 5, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy4-and-reverse",
        which: "computerBot",
      },
      position: { x: 5, y: 2, z: 0 },
      type: "monster",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "left", tiles: ["window3", "coil", "window2"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "left", tiles: ["window2", "coil", "window1"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "away",
        tiles: ["window2", "window3", "coil", "window2", "coil", "window1"],
      },
      position: { x: 2, y: 8, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
