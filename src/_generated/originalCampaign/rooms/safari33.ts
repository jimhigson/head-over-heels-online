import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  id: "safari33",
  items: {
    b: {
      config: { style: "organic", times: { z: 3 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "safari32" },
      position: { x: 0, y: 1, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "safari37crown" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "safari34" },
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
        movement: "patrol-randomly-xy4",
        which: "elephant",
      },
      position: { x: 4, y: 4, z: 0 },
      type: "monster",
    },
    pu: { config: {}, position: { x: 2, y: 1, z: 0 }, type: "pushableBlock" },
    t: {
      config: {
        activatedOnStoreValue: "planetsLiberated.safari",
        times: { x: 2, y: 2 },
        toRoom: "safari1",
      },
      position: { x: 1, y: 6, z: 0 },
      type: "teleporter",
    },
    w: {
      config: { direction: "right", times: { y: 1 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 5 } },
      position: { x: 0, y: 3, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["wall", "shield", "wall"] },
      position: { x: 0, y: 8, z: 0 },
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
  roomAbove: "safari36",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
