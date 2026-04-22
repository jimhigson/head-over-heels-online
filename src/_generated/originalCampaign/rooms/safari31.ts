import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "safari31",
  items: {
    b: {
      config: { style: "organic", times: { y: 4 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { y: 3 } },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 2, y: 6, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 3, z: 1 },
      type: "block",
    },
    ch: { config: {}, position: { x: 6, y: 6, z: 1 }, type: "charles" },
    d: {
      config: { direction: "right", toRoom: "safari17fish" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "safari32" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 6, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    j: { config: {}, position: { x: 0, y: 6, z: 1 }, type: "joystick" },
    j1: { config: {}, position: { x: 1, y: 5, z: 1 }, type: "joystick" },
    j2: { config: {}, position: { x: 1, y: 7, z: 1 }, type: "joystick" },
    j3: { config: {}, position: { x: 2, y: 6, z: 1 }, type: "joystick" },
    pr: {
      config: { style: "drum" },
      position: { x: 4, y: 0, z: 1 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
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
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["wall", "shield", "wall"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["wall", "window", "wall"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
