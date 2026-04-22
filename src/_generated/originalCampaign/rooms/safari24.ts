import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "safari24",
  items: {
    b: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 2, z: 1 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 2, z: 1 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "safari25" },
      position: { x: 0, y: 2, z: 3 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "safari23" },
      position: { x: 8, y: 2, z: 3 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 4, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano" },
      position: { x: 4, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 4, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "volcano" },
      position: { x: 4, y: 5, z: 1 },
      type: "deadlyBlock",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    mp: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "towards",
      },
      position: { x: 0, y: 2.5, z: 0 },
      type: "movingPlatform",
    },
    mp1: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "away",
      },
      position: { x: 7, y: 2.5, z: 0 },
      type: "movingPlatform",
    },
    mp2: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "left",
      },
      position: { x: 3.5, y: 0, z: 0 },
      type: "movingPlatform",
    },
    mp3: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "right",
      },
      position: { x: 3.5, y: 5, z: 0 },
      type: "movingPlatform",
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
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["wall", "shield"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["shield", "wall"] },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
