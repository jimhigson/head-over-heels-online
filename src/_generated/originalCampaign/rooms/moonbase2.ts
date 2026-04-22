import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "moonbase2",
  items: {
    d: {
      config: { direction: "right", toRoom: "moonbase1" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "moonbase3" },
      position: { x: 4, y: 6, z: 4 },
      type: "door",
    },
    db: {
      config: { style: "toaster", times: { y: 4 } },
      position: { x: 7, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 8, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    h: { config: {}, position: { x: 2, y: 5, z: 0 }, type: "hushPuppy" },
    h1: { config: {}, position: { x: 3, y: 5, z: 1 }, type: "hushPuppy" },
    h2: {
      config: { times: { x: 2 } },
      position: { x: 4, y: 5, z: 2 },
      type: "hushPuppy",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 0, y: 5, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 7, y: 1, z: 1 },
      type: "monster",
    },
    m2: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 7, y: 2, z: 1 },
      type: "monster",
    },
    m3: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 7, y: 3, z: 1 },
      type: "monster",
    },
    m4: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 7, y: 4, z: 1 },
      type: "monster",
    },
    w: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: {
        direction: "away",
        tiles: ["window3", "coil", "window2", "window3"],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["coil", "window1"] },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "left",
        tiles: ["window1", "coil", "window2", "window3", "coil", "window1"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "right", times: { y: 4 } },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
