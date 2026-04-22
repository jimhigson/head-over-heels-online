import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "penitentiary34crown",
  items: {
    b: {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "artificial", times: { z: 5 } },
      position: { x: 0, y: 0, z: 1 },
      type: "block",
    },
    b2: {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 2 },
      type: "block",
    },
    b3: {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 7, y: 3, z: 4 },
      type: "block",
    },
    d: {
      config: { direction: "away", toRoom: "penitentiary33" },
      position: { x: 3, y: 8, z: 1 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "crown", planet: "penitentiary" },
      position: { x: 0, y: 0, z: 6 },
      type: "pickup",
    },
    pr: {
      config: { style: "sticks" },
      position: { x: 0, y: 7, z: 3 },
      type: "portableBlock",
    },
    pu: { config: {}, position: { x: 7, y: 3, z: 5 }, type: "pushableBlock" },
    t: {
      config: { toItemId: "t1", toRoom: "penitentiary18fish" },
      position: { x: 7, y: 5, z: 4 },
      type: "teleporter",
    },
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
      config: { direction: "away", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
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
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
