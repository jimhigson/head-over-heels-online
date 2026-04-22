import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "safari7",
  items: {
    b: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    b2: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 2, y: 1, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 2, y: 2, z: 0 },
      type: "block",
    },
    d: {
      config: {
        direction: "right",
        meta: { toSubRoom: "right" },
        toRoom: "safari6triple",
      },
      position: { x: 0, y: 2, z: 1 },
      type: "door",
    },
    d1: {
      config: {
        direction: "towards",
        meta: { toSubRoom: "left" },
        toRoom: "safari6triple",
      },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "safari8" },
      position: { x: 6, y: 2, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 6, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
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
        tiles: ["shield", "wall", "window", "window", "wall", "shield"],
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
      config: { direction: "left", tiles: ["wall", "shield"] },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    w6: {
      config: { direction: "left", tiles: ["shield", "wall"] },
      position: { x: 6, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
