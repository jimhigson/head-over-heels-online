import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "moonbase2",
  items: {
    "deadlyBlock@7,1,0": {
      config: { style: "toaster", times: { y: 4 } },
      position: { x: 7, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0": {
      config: { direction: "right", toRoom: "moonbase1" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@3,6,4": {
      config: { direction: "away", toRoom: "moonbase3" },
      position: { x: 3, y: 6, z: 4 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 8, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "hushPuppy@2,5,0": {
      config: {},
      position: { x: 2, y: 5, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@3,5,1": {
      config: {},
      position: { x: 3, y: 5, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@4,5,2": {
      config: {},
      position: { x: 4, y: 5, z: 2 },
      type: "hushPuppy",
    },
    "monster@0,5,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 0, y: 5, z: 0 },
      type: "monster",
    },
    "monster@7,1,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 7, y: 1, z: 1 },
      type: "monster",
    },
    "monster@7,2,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 7, y: 2, z: 1 },
      type: "monster",
    },
    "monster@7,3,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 7, y: 3, z: 1 },
      type: "monster",
    },
    "monster@7,4,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 7, y: 4, z: 1 },
      type: "monster",
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
        tiles: ["window3", "coil", "window2"],
        times: { x: 3 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@5,6,0": {
      config: {
        direction: "away",
        tiles: ["window2", "coil", "window1"],
        times: { x: 3 },
      },
      position: { x: 5, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["window1", "coil", "window2", "window3", "coil", "window1"],
        times: { y: 6 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
