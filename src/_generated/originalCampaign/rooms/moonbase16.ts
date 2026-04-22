import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "moonbase16",
  items: {
    br: {
      config: { axis: "y", times: { y: 6 } },
      position: { x: 6, y: 0, z: 0 },
      type: "barrier",
    },
    d: {
      config: { direction: "right", toRoom: "moonbase13" },
      position: { x: 0, y: 2, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "towards", toRoom: "moonbase17" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { y: 6, z: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 12, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "towards-on-shortest-axis-xy4",
        which: "computerBot",
      },
      position: { x: 11, y: 6, z: 1 },
      type: "monster",
    },
    pi: {
      config: { gives: "shield" },
      position: { x: 11, y: 5, z: 0 },
      type: "pickup",
    },
    pr: {
      config: { style: "drum" },
      position: { x: 0, y: 0, z: 0 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "drum" },
      position: { x: 0, y: 1, z: 0 },
      type: "portableBlock",
    },
    pr2: {
      config: { style: "drum" },
      position: { x: 3, y: 0, z: 0 },
      type: "portableBlock",
    },
    pr3: {
      config: { style: "drum" },
      position: { x: 4, y: 0, z: 0 },
      type: "portableBlock",
    },
    pr4: {
      config: { style: "drum" },
      position: { x: 0, y: 0.5, z: 1 },
      type: "portableBlock",
    },
    pr5: {
      config: { style: "drum" },
      position: { x: 3.5, y: 0, z: 1 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: [
          "window1",
          "coil",
          "window2",
          "window3",
          "coil",
          "window1",
          "window1",
          "coil",
          "window2",
          "window3",
          "coil",
          "window1",
        ],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 10, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: ["window1", "coil", "window2", "window3", "coil", "window1"],
      },
      position: { x: 12, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 1, y: 0 },
        physicalPosition: { from: { x: 6, y: 0 }, to: { x: 12, y: 6 } },
      },
      right: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 6, y: 6 } },
      },
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
