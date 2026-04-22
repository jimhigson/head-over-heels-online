import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "penitentiary27",
  items: {
    b: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "penitentiary28" },
      position: { x: 0, y: 0, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "penitentiary26" },
      position: { x: 8, y: 0, z: 2 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 3, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano" },
      position: { x: 3, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    mp: {
      config: {
        activated: "on-stand",
        movement: "clockwise",
        startDirection: "right",
      },
      position: { x: 6, y: 0, z: 0 },
      type: "movingPlatform",
    },
    w: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: {
        direction: "away",
        tiles: [
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
        ],
      },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
