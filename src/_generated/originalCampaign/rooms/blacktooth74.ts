import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "blacktooth74",
  items: {
    b: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 2, z: 4 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 5 } },
      position: { x: 1, y: 3, z: 4 },
      type: "block",
    },
    b2: {
      config: { style: "tower", times: { z: 4 } },
      position: { x: 5, y: 3, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "tower", times: { y: 2, z: 4 } },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth73" },
      position: { x: 0, y: 2, z: 5 },
      type: "door",
    },
    d1: {
      config: { direction: "towards", toRoom: "blacktooth75" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy4",
        which: "monkey",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "monster",
    },
    pi: {
      config: { gives: "doughnuts" },
      position: { x: 5, y: 3, z: 5 },
      type: "pickup",
    },
    pr: {
      config: { style: "cube" },
      position: { x: 0, y: 1, z: 0 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "cube" },
      position: { x: 4, y: 5, z: 0 },
      type: "portableBlock",
    },
    pr2: {
      config: { style: "cube" },
      position: { x: 5, y: 0, z: 0 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 2 } },
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
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
