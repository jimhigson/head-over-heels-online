import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  id: "safari4",
  items: {
    b: {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic" },
      position: { x: 3, y: 7, z: 3 },
      type: "block",
    },
    b2: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 7, y: 3, z: 1 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "safari3" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: {
        direction: "away",
        meta: { toSubRoom: "left" },
        toRoom: "safari18",
      },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "safari5" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 7, y: 4, z: 1 },
      type: "monster",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
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
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["wall", "window", "wall"] },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["wall", "shield", "wall"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w6: {
      config: { direction: "left", tiles: ["wall", "window", "wall"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
