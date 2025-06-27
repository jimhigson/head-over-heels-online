import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  id: "moonbase13",
  items: {
    "deadlyBlock@0,2,0": {
      config: { style: "toaster", times: { y: 4 } },
      position: { x: 0, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "moonbase3" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0": {
      config: { direction: "away", toRoom: "moonbase14" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    "door@4,3,0": {
      config: {
        direction: "left",
        meta: { toSubRoom: "right" },
        toRoom: "moonbase16",
      },
      position: { x: 4, y: 3, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 4, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "monster@0,2,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 2, z: 1 },
      type: "monster",
    },
    "monster@0,3,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 3, z: 1 },
      type: "monster",
    },
    "monster@0,4,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 4, z: 1 },
      type: "monster",
    },
    "monster@0,5,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 5, z: 1 },
      type: "monster",
    },
    switch: {
      config: {
        initialSetting: "right",
        modifies: [
          {
            expectType: "monster",
            newState: {
              activated: { left: true, right: false },
              everActivated: { left: true },
            },
            targets: [
              "monster@0,2,1",
              "monster@0,3,1",
              "monster@0,4,1",
              "monster@0,5,1",
            ],
          },
          {
            expectType: "switch",
            newState: { setting: { left: "left", right: "right" } },
            targets: ["switch2"],
          },
        ],
        type: "in-room",
      },
      position: { x: 0, y: 1, z: 0 },
      type: "switch",
    },
    switch2: {
      config: {
        initialSetting: "right",
        modifies: [
          {
            expectType: "monster",
            newState: {
              activated: { left: true, right: false },
              everActivated: { left: true },
            },
            targets: [
              "monster@0,2,1",
              "monster@0,3,1",
              "monster@0,4,1",
              "monster@0,5,1",
            ],
          },
          {
            expectType: "switch",
            newState: { setting: { left: "left", right: "right" } },
            targets: ["switch"],
          },
        ],
        type: "in-room",
      },
      position: { x: 0, y: 6, z: 0 },
      type: "switch",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["window2"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@3,0,0": {
      config: { direction: "towards" },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    "wall@3,8,0": {
      config: { direction: "away", tiles: ["window1"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "left", tiles: ["window3", "coil", "window2"] },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,5,0": {
      config: { direction: "left", tiles: ["window2", "coil", "window1"] },
      position: { x: 4, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
  size: { x: 4, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
