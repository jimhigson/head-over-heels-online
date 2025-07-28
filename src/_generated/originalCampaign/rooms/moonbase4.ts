import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "moonbase4",
  items: {
    "block@1,7,0": {
      config: { style: "artificial", times: { z: 2 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@1,7,3": {
      config: { style: "artificial", times: { x: 3 } },
      position: { x: 1, y: 7, z: 3 },
      type: "block",
    },
    "block@7,0,0": {
      config: { style: "artificial" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@7,1,1": {
      config: { style: "artificial" },
      position: { x: 7, y: 1, z: 1 },
      type: "block",
    },
    "block@7,2,2": {
      config: { style: "artificial" },
      position: { x: 7, y: 2, z: 2 },
      type: "block",
    },
    "block@7,3,3": {
      config: { style: "artificial" },
      position: { x: 7, y: 3, z: 3 },
      type: "block",
    },
    "deadlyBlock@1,1,0": {
      config: { style: "volcano" },
      position: { x: 1, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,6,0": {
      config: { style: "volcano" },
      position: { x: 1, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,3,0": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 2, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,2,0": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 3, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,5,0": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 3, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,3,0": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 5, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,1,0": {
      config: { style: "volcano" },
      position: { x: 6, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,6,0": {
      config: { style: "volcano" },
      position: { x: 6, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "moonbase5" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "moonbase1" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "monster@2,5,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy4-and-reverse",
        which: "computerBot",
      },
      position: { x: 2, y: 5, z: 0 },
      type: "monster",
    },
    "monster@5,2,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy4-and-reverse",
        which: "computerBot",
      },
      position: { x: 5, y: 2, z: 0 },
      type: "monster",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["window3", "coil", "window2"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: { direction: "away", tiles: ["window2", "coil", "window1"] },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["window3", "coil", "window2"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: { direction: "left", tiles: ["window2", "coil", "window1"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
