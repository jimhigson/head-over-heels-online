import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "safari2",
  items: {
    b: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 11, z: 1 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 7, y: 6, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "safari1" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "safari3" },
      position: { x: 3, y: 12, z: 3 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano" },
      position: { x: 0, y: 1, z: 1 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano" },
      position: { x: 0, y: 9, z: 0 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "volcano" },
      position: { x: 2, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    db4: {
      config: { style: "volcano" },
      position: { x: 4, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    db5: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 6, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    db6: {
      config: { style: "volcano" },
      position: { x: 7, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db7: {
      config: { style: "volcano", times: { x: 8, y: 2 } },
      position: { x: 0, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 12 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    mp: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "away",
      },
      position: { x: 7, y: 1, z: 0 },
      type: "movingPlatform",
    },
    mp1: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "right",
      },
      position: { x: 6, y: 9, z: 0 },
      type: "movingPlatform",
    },
    w: {
      config: { direction: "right", times: { y: 12 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["wall", "shield", "wall"] },
      position: { x: 0, y: 12, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["wall", "window", "wall"] },
      position: { x: 5, y: 12, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
