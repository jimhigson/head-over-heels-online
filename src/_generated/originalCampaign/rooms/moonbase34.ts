import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "moonbase34",
  items: {
    d: {
      config: {
        direction: "right",
        meta: { toSubRoom: "middle" },
        toRoom: "moonbase33triple",
      },
      position: { x: 0, y: 1, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "moonbase35" },
      position: { x: 3, y: 4, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "toaster", times: { y: 4 } },
      position: { x: 7, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 8, y: 4 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "after-player-near",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 7, y: 0, z: 1 },
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
    w: {
      config: { direction: "right" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right" },
      position: { x: 0, y: 3, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["window3", "coil", "window2"] },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["window2", "coil", "window1"] },
      position: { x: 5, y: 4, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: ["window2", "window3", "window1", "coil"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
