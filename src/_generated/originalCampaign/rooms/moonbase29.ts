import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "moonbase29",
  items: {
    d: {
      config: { direction: "right", toRoom: "moonbase28" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "toaster", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "toaster", times: { x: 3 } },
      position: { x: 0, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "toaster", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "toaster", times: { x: 3 } },
      position: { x: 5, y: 7, z: 0 },
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
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        which: "cyberman",
      },
      position: { x: 0, y: 0, z: 1 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 0, y: 7, z: 1 },
      type: "monster",
    },
    m10: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        which: "cyberman",
      },
      position: { x: 7, y: 0, z: 1 },
      type: "monster",
    },
    m11: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 7, y: 7, z: 1 },
      type: "monster",
    },
    m2: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        which: "cyberman",
      },
      position: { x: 1, y: 0, z: 1 },
      type: "monster",
    },
    m3: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 1, y: 7, z: 1 },
      type: "monster",
    },
    m4: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        which: "cyberman",
      },
      position: { x: 2, y: 0, z: 1 },
      type: "monster",
    },
    m5: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 2, y: 7, z: 1 },
      type: "monster",
    },
    m6: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        which: "cyberman",
      },
      position: { x: 5, y: 0, z: 1 },
      type: "monster",
    },
    m7: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 5, y: 7, z: 1 },
      type: "monster",
    },
    m8: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        which: "cyberman",
      },
      position: { x: 6, y: 0, z: 1 },
      type: "monster",
    },
    m9: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 6, y: 7, z: 1 },
      type: "monster",
    },
    t: {
      config: { times: { x: 2, y: 2 }, toRoom: "moonbase32" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
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
        tiles: [
          "window3",
          "window1",
          "coil",
          "window2",
          "window3",
          "coil",
          "window3",
          "window1",
        ],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: [
          "window3",
          "window1",
          "coil",
          "window2",
          "window3",
          "coil",
          "window3",
          "window1",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    nonContiguousRelationship: {
      gridOffset: { x: 0, y: 2, z: 0 },
      with: { room: "moonbase32" },
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
