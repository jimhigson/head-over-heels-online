import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "moonbase",
  id: "moonbase7",
  items: {
    "block@2,0,0": {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@2,0,3": {
      config: { style: "organic", times: { x: 4 } },
      position: { x: 2, y: 0, z: 3 },
      type: "block",
    },
    "deadlyBlock@0,7,0": {
      config: { style: "toaster", times: { x: 3 } },
      position: { x: 0, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,7,0": {
      config: { style: "toaster", times: { x: 3 } },
      position: { x: 5, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "moonbase8" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,0,4": {
      config: { direction: "towards", toRoom: "moonbase6" },
      position: { x: 4, y: 0, z: 4 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "moonbase15" },
      position: { x: 8, y: 5, z: 0 },
      type: "door",
    },
    extraSupport: {
      config: { style: "organic", times: { x: 2, z: 3 } },
      isExtra: true,
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "monster@0,7,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 0, y: 7, z: 1 },
      type: "monster",
    },
    "monster@1,7,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 1, y: 7, z: 1 },
      type: "monster",
    },
    "monster@2,7,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 2, y: 7, z: 1 },
      type: "monster",
    },
    "monster@5,7,1": {
      config: {
        activated: "after-player-near",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 5, y: 7, z: 1 },
      type: "monster",
    },
    "monster@6,7,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 6, y: 7, z: 1 },
      type: "monster",
    },
    "monster@7,7,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 7, y: 7, z: 1 },
      type: "monster",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", times: { y: 3 } },
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
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["window3", "coil", "window2", "coil", "window1"],
        times: { y: 5 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: { direction: "left", tiles: ["window2"], times: { y: 1 } },
      position: { x: 8, y: 7, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
