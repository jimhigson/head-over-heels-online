import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "moonbase33triple",
  items: {
    "deadlyBlock@0,10,0": {
      config: { style: "toaster", times: { y: 4 } },
      position: { x: 0, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@11,1,0": {
      config: { style: "toaster", times: { y: 5 } },
      position: { x: 11, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@11,14,0": {
      config: { style: "toaster" },
      position: { x: 11, y: 14, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@11,9,0": {
      config: { style: "toaster" },
      position: { x: 11, y: 9, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,10,0": {
      config: { style: "toaster", times: { x: 2, y: 4 } },
      position: { x: 5, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,2,0": {
      config: { style: "toaster", times: { y: 4 } },
      position: { x: 6, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "door@12,11,0": {
      config: { direction: "left", toRoom: "moonbase34" },
      position: { x: 12, y: 11, z: 0 },
      type: "door",
    },
    "door@2,16,0": {
      config: { direction: "away", toRoom: "moonbase36" },
      position: { x: 2, y: 16, z: 0 },
      type: "door",
    },
    "door@8,0,0": {
      config: { direction: "towards", toRoom: "moonbase32" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
    floorL: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 6, y: 16 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "floor",
    },
    floorR: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 6, y: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "floor",
    },
    "monster@0,10,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 10, z: 1 },
      type: "monster",
    },
    "monster@0,11,1": {
      config: {
        activated: "after-player-near",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 11, z: 1 },
      type: "monster",
    },
    "monster@0,12,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 12, z: 1 },
      type: "monster",
    },
    "monster@0,13,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 13, z: 1 },
      type: "monster",
    },
    "monster@11,1,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 11, y: 1, z: 1 },
      type: "monster",
    },
    "monster@11,14,1": {
      config: {
        activated: "after-player-near",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 11, y: 14, z: 1 },
      type: "monster",
    },
    "monster@11,2,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 11, y: 2, z: 1 },
      type: "monster",
    },
    "monster@11,3,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 11, y: 3, z: 1 },
      type: "monster",
    },
    "monster@11,4,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 11, y: 4, z: 1 },
      type: "monster",
    },
    "monster@11,5,1": {
      config: {
        activated: "after-player-near",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 11, y: 5, z: 1 },
      type: "monster",
    },
    "monster@11,9,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 11, y: 9, z: 1 },
      type: "monster",
    },
    "monster@5,10,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 5, y: 10, z: 1 },
      type: "monster",
    },
    "monster@5,11,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 5, y: 11, z: 1 },
      type: "monster",
    },
    "monster@5,12,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 5, y: 12, z: 1 },
      type: "monster",
    },
    "monster@5,13,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 5, y: 13, z: 1 },
      type: "monster",
    },
    "monster@6,10,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 10, z: 1 },
      type: "monster",
    },
    "monster@6,11,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 11, z: 1 },
      type: "monster",
    },
    "monster@6,12,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 12, z: 1 },
      type: "monster",
    },
    "monster@6,13,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 13, z: 1 },
      type: "monster",
    },
    "monster@6,2,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 2, z: 1 },
      type: "monster",
    },
    "monster@6,3,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 3, z: 1 },
      type: "monster",
    },
    "monster@6,4,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 4, z: 1 },
      type: "monster",
    },
    "monster@6,5,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 5, z: 1 },
      type: "monster",
    },
    uhohSwitch: {
      config: {
        initialSetting: "right",
        modifies: [
          {
            expectType: "monster",
            leftState: { activated: true, everActivated: true },
            rightState: { activated: false },
            targets: [
              "monster@0,10,1",
              "monster@0,10,1",
              "monster@0,11,1",
              "monster@0,12,1",
              "monster@0,13,1",
              "monster@11,1,1",
              "monster@11,14,1",
              "monster@11,2,1",
              "monster@11,3,1",
              "monster@11,4,1",
              "monster@11,5,1",
              "monster@11,9,1",
              "monster@5,10,1",
              "monster@5,11,1",
              "monster@5,12,1",
              "monster@5,13,1",
              "monster@6,10,1",
              "monster@6,11,1",
              "monster@6,12,1",
              "monster@6,13,1",
              "monster@6,2,1",
              "monster@6,3,1",
              "monster@6,4,1",
              "monster@6,5,1",
            ],
          },
        ],
        type: "in-room",
      },
      position: { x: 5, y: 15, z: 2 },
      type: "switch",
    },
    uhohSwitchBlock: {
      config: { style: "artificial", times: { z: 2 } },
      position: { x: 5, y: 15, z: 0 },
      type: "block",
    },
    uhohSwitchBlock2: {
      config: { style: "artificial" },
      position: { x: 4, y: 15, z: 0 },
      type: "block",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall(right)@5,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,7,0": {
      config: { direction: "towards", times: { x: 5 } },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@0,16,0": {
      config: { direction: "away", tiles: ["window2", "window3"] },
      position: { x: 0, y: 16, z: 0 },
      type: "wall",
    },
    "wall@10,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 10, y: 0, z: 0 },
      type: "wall",
    },
    "wall@12,0,0": {
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
          "window3",
          "coil",
          "window2",
        ],
      },
      position: { x: 12, y: 0, z: 0 },
      type: "wall",
    },
    "wall@12,13,0": {
      config: { direction: "left", tiles: ["window2", "coil", "window1"] },
      position: { x: 12, y: 13, z: 0 },
      type: "wall",
    },
    "wall@4,16,0": {
      config: {
        direction: "away",
        tiles: [
          "window3",
          "window1",
          "window1",
          "coil",
          "window2",
          "window3",
          "coil",
          "window1",
        ],
      },
      position: { x: 4, y: 16, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 1, y: 0 },
        physicalPosition: { from: { x: 6, y: 0 }, to: { x: 12, y: 8 } },
      },
      middle: {
        gridPosition: { x: 1, y: 1 },
        physicalPosition: { from: { x: 6, y: 8 }, to: { x: 12, y: 16 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 8 }, to: { x: 6, y: 16 } },
      },
    },
  },
  planet: "moonbase",
  size: { x: 12, y: 16 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
