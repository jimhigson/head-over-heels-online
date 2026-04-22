import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "safari9",
  items: {
    b: {
      config: { style: "organic" },
      position: { x: 0, y: 2, z: 3 },
      type: "block",
    },
    b1: {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 3 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "safari8" },
      position: { x: 0, y: 2, z: 4 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "safari14" },
      position: { x: 8, y: 2, z: 5 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { x: 8 } },
      position: { x: 0, y: 1, z: 2 },
      type: "deadlyBlock",
    },
    f: {
      config: { floorType: "none", times: { x: 8, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    mp: {
      config: {
        activated: "on-stand",
        movement: "clockwise",
        startDirection: "left",
      },
      position: { x: 0, y: 1, z: 3 },
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
  roomBelow: "safari10",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
