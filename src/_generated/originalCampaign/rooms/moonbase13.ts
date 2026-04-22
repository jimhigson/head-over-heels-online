import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  id: "moonbase13",
  items: {
    d: {
      config: { direction: "towards", toRoom: "moonbase3" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "moonbase14" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    d2: {
      config: {
        direction: "left",
        meta: { toSubRoom: "right" },
        toRoom: "moonbase16",
      },
      position: { x: 4, y: 3, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "toaster", times: { y: 4 } },
      position: { x: 0, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 4, y: 8 },
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
      position: { x: 0, y: 2, z: 1 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 3, z: 1 },
      type: "monster",
    },
    m2: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 4, z: 1 },
      type: "monster",
    },
    m3: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 5, z: 1 },
      type: "monster",
    },
    sw: {
      config: {
        initialSetting: "right",
        modifies: [
          { activates: true, expectType: "monster" },
          { expectType: "switch", flip: true },
        ],
        type: "in-room",
      },
      position: { x: 0, y: 1, z: 0 },
      type: "switch",
    },
    sw1: {
      config: {
        initialSetting: "right",
        modifies: [{ expectType: "switch", flip: true }],
        type: "in-room",
      },
      position: { x: 0, y: 6, z: 0 },
      type: "switch",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["window2"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards" },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["window1"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["window3", "coil", "window2"] },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    w6: {
      config: { direction: "left", tiles: ["window2", "coil", "window1"] },
      position: { x: 4, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
