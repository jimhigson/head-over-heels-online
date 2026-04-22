import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "safari11",
  items: {
    d: {
      config: { direction: "right", toRoom: "safari10" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "safari12" },
      position: { x: 6, y: 2, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 6, y: 6 },
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
      position: { x: 0, y: 0, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "turn-to-player",
        startDirection: "right",
        which: "elephantHead",
      },
      position: { x: 2, y: 3, z: 0 },
      type: "monster",
    },
    m2: {
      config: {
        activated: "on",
        movement: "turn-to-player",
        startDirection: "right",
        which: "elephantHead",
      },
      position: { x: 3, y: 1, z: 0 },
      type: "monster",
    },
    m3: {
      config: {
        activated: "on",
        movement: "turn-to-player",
        startDirection: "right",
        which: "elephantHead",
      },
      position: { x: 3, y: 5, z: 0 },
      type: "monster",
    },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 6 } },
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
      config: { direction: "left", tiles: ["wall", "shield"] },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["shield", "wall"] },
      position: { x: 6, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
