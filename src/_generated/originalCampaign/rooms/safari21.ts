import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "safari21",
  items: {
    b: {
      config: { style: "organic" },
      position: { x: 0, y: 7, z: 4 },
      type: "block",
    },
    b1: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 1, y: 7, z: 3 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 4, y: 7, z: 2 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 7, y: 7, z: 1 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "safari20" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 3, y: 6, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 2, y: 2, z: 0 },
      type: "monster",
    },
    m2: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 4, y: 5, z: 0 },
      type: "monster",
    },
    m3: {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 5, y: 4.5, z: 0 },
      type: "monster",
    },
    pi: {
      config: { gives: "doughnuts" },
      position: { x: 0, y: 7, z: 5 },
      type: "pickup",
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
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
