import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "moonbase35",
  items: {
    d: {
      config: { direction: "towards", toRoom: "moonbase34" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "toaster", times: { y: 4 } },
      position: { x: 0, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "toaster", times: { y: 4 } },
      position: { x: 5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 1, z: 1 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "after-player-near",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 2, z: 1 },
      type: "monster",
    },
    m2: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 3, z: 1 },
      type: "monster",
    },
    m3: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 4, z: 1 },
      type: "monster",
    },
    m4: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 5, y: 1, z: 1 },
      type: "monster",
    },
    m5: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 5, y: 2, z: 1 },
      type: "monster",
    },
    m6: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 5, y: 3, z: 1 },
      type: "monster",
    },
    m7: {
      config: {
        activated: "after-player-near",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 5, y: 4, z: 1 },
      type: "monster",
    },
    t: {
      config: { times: { x: 2, y: 2 }, toRoom: "blacktooth51" },
      position: { x: 2, y: 2, z: 0 },
      type: "teleporter",
    },
    w: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
        tiles: ["window1", "coil", "window2", "window3", "coil", "window1"],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: ["window1", "coil", "window2", "window3", "coil", "window1"],
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
