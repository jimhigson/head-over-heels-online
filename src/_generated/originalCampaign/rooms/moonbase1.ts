import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "moonbase",
  id: "moonbase1",
  items: {
    "deadlyBlock@0,0,0": {
      config: { style: "toaster", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,7,0": {
      config: { style: "toaster", times: { x: 3 } },
      position: { x: 0, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,0,0": {
      config: { style: "toaster", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,7,0": {
      config: { style: "toaster", times: { x: 3 } },
      position: { x: 5, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "moonbase4" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "moonbase2" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "monster@0,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 0, z: 1 },
      type: "monster",
    },
    "monster@0,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 7, z: 1 },
      type: "monster",
    },
    "monster@1,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 1, y: 0, z: 1 },
      type: "monster",
    },
    "monster@1,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 1, y: 7, z: 1 },
      type: "monster",
    },
    "monster@2,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 2, y: 0, z: 1 },
      type: "monster",
    },
    "monster@2,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 2, y: 7, z: 1 },
      type: "monster",
    },
    "monster@5,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 5, y: 0, z: 1 },
      type: "monster",
    },
    "monster@5,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 5, y: 7, z: 1 },
      type: "monster",
    },
    "monster@6,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 6, y: 0, z: 1 },
      type: "monster",
    },
    "monster@6,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 6, y: 7, z: 1 },
      type: "monster",
    },
    "monster@7,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 7, y: 0, z: 1 },
      type: "monster",
    },
    "monster@7,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 7, y: 7, z: 1 },
      type: "monster",
    },
    scroll: {
      config: { gives: "scroll", page: "hushPuppies" },
      position: { x: 7, y: 5, z: 0 },
      type: "pickup",
    },
    "teleporter@3,3,0": {
      config: { toPosition: { x: 2, y: 3, z: 0 }, toRoom: "blacktooth51" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0": {
      config: { toPosition: { x: 2, y: 4, z: 0 }, toRoom: "blacktooth51" },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@4,3,0": {
      config: { toPosition: { x: 3, y: 3, z: 0 }, toRoom: "blacktooth51" },
      position: { x: 4, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@4,4,0": {
      config: { toPosition: { x: 3, y: 4, z: 0 }, toRoom: "blacktooth51" },
      position: { x: 4, y: 4, z: 0 },
      type: "teleporter",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
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
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["window3", "coil", "window2"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["window2", "coil", "window1"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
