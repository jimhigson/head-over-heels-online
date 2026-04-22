import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "penitentiary32",
  items: {
    b: {
      config: { style: "organic", times: { x: 6, y: 2 } },
      position: { x: 2, y: 0, z: 4 },
      type: "block",
    },
    b1: {
      config: { style: "tower", times: { z: 2 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "penitentiary33" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 8, y: 2 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    h: { config: {}, position: { x: 5, y: 0, z: 0 }, type: "hushPuppy" },
    h1: { config: {}, position: { x: 6, y: 0, z: 1 }, type: "hushPuppy" },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 0, y: 1, z: 0 },
      type: "monster",
    },
    sd: {
      config: { startingPhase: 1, style: "spikyBall" },
      position: { x: 2, y: 0, z: 5 },
      type: "slidingDeadly",
    },
    sd1: {
      config: { startingPhase: 2, style: "spikyBall" },
      position: { x: 2, y: 1, z: 5 },
      type: "slidingDeadly",
    },
    t: {
      config: { toRoom: "penitentiary34crown" },
      position: { x: 7, y: 0, z: 2 },
      type: "teleporter",
    },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
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
    w3: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["loop", "loop"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary31",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
