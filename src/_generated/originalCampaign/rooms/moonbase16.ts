import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "moonbase",
  id: "moonbase16",
  items: {
    barier1: {
      config: { axis: "y", times: { y: 6 } },
      isExtra: true,
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
    "monster@11,0,0": {
      config: {
        activated: true,
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
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
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
        times: { x: 12 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@10,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 10, y: 0, z: 0 },
      type: "wall",
    },
    "wall@12,0,0": {
      config: {
        direction: "left",
        tiles: ["window1", "coil", "window2", "window3", "coil", "window1"],
        times: { y: 6 },
      },
      position: { x: 12, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
  size: { x: 12, y: 6 },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
