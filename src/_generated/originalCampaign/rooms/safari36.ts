import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  id: "safari36",
  items: {
    b: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 4, y: 3, z: 0 },
      type: "block",
    },
    b1: {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { y: 2 },
      },
      position: { x: 4, y: 4, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 4, y: 6, z: 0 },
      type: "block",
    },
    b3: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 6, y: 3, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "left", toRoom: "safari35" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "none", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    sk: { config: {}, position: { x: 4, y: 3, z: 1 }, type: "spikes" },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
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
    w3: {
      config: { direction: "left", tiles: ["wall", "shield", "wall"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["wall", "window", "wall"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  roomBelow: "safari33",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
