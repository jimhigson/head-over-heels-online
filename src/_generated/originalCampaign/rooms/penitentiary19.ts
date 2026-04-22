import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "penitentiary19",
  items: {
    b: {
      config: { style: "artificial", times: { y: 8 } },
      position: { x: 3, y: 0, z: 5 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "penitentiary12" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "penitentiary21" },
      position: { x: 1, y: 8, z: 3 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 4, y: 8 },
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
      position: { x: 3, y: 3, z: 6 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 4, z: 6 },
      type: "monster",
    },
    pr: {
      config: { style: "drum" },
      position: { x: 2, y: 3, z: 0 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["loop"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards" },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["loop"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
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
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
