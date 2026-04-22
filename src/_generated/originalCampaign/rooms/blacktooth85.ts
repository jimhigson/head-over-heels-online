import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "blacktooth85",
  items: {
    b: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 0, z: 4 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "tower" },
      position: { x: 3, y: 4, z: 2 },
      type: "block",
    },
    b3: {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 3, y: 4, z: 3 },
      type: "block",
    },
    b4: {
      config: { style: "tower", times: { x: 2, z: 4 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "blacktooth86" },
      position: { x: 3, y: 0, z: 5 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth84" },
      position: { x: 8, y: 6, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 8 },
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
      position: { x: 0, y: 7, z: 1 },
      type: "monster",
    },
    pr: {
      config: { style: "cube" },
      position: { x: 0, y: 7, z: 0 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "cube" },
      position: { x: 3, y: 4, z: 5 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: {
        direction: "away",
        tiles: [
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "plain", "plain", "plain", "plain"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
