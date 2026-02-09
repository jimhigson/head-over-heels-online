import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "moonbase16",
  items: {
    barier1: {
      config: { axis: "y", times: { y: 6 } },
      position: { x: 6, y: 0, z: 0 },
      type: "barrier",
    },
    "deadlyBlock@2,0,0": {
      config: { style: "volcano", times: { y: 6, z: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,1": {
      config: { direction: "right", toRoom: "moonbase13" },
      position: { x: 0, y: 2, z: 1 },
      type: "door",
    },
    "door@8,0,0": {
      config: { direction: "towards", toRoom: "moonbase17" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 12, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "monster@11,0,0": {
      config: {
        activated: "on",
        movement: "towards-on-shortest-axis-xy4",
        which: "computerBot",
      },
      position: { x: 11, y: 0, z: 0 },
      type: "monster",
    },
    "pickup@11,5,0": {
      config: { gives: "shield" },
      position: { x: 11, y: 5, z: 0 },
      type: "pickup",
    },
    portableBlock: {
      config: { style: "drum" },
      position: { x: 0, y: 0.5, z: 1 },
      type: "portableBlock",
    },
    "portableBlock@0,0,0": {
      config: { style: "drum" },
      position: { x: 0, y: 0, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@0,1,0": {
      config: { style: "drum" },
      position: { x: 0, y: 1, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@3,0,0": {
      config: { style: "drum" },
      position: { x: 3, y: 0, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@4,0,0": {
      config: { style: "drum" },
      position: { x: 4, y: 0, z: 0 },
      type: "portableBlock",
    },
    portableBlock_2: {
      config: { style: "drum" },
      position: { x: 3.5, y: 0, z: 1 },
      type: "portableBlock",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
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
    "wall@10,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 10, y: 0, z: 0 },
      type: "wall",
    },
    "wall@12,0,0": {
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
