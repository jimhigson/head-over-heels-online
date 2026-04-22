import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "penitentiary12",
  items: {
    b: {
      config: { style: "organic", times: { x: 2, y: 2 } },
      position: { x: 0, y: 1, z: 3 },
      type: "block",
    },
    b1: {
      config: { style: "artificial", times: { z: 3 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "tower", times: { x: 2, y: 2, z: 3 } },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    d: {
      config: {
        direction: "right",
        meta: { toSubRoom: "left" },
        toRoom: "penitentiary18fish",
      },
      position: { x: 0, y: 1, z: 4 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "penitentiary19" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "penitentiary11" },
      position: { x: 8, y: 3, z: 0 },
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
    h: { config: {}, position: { x: 3, y: 0, z: 0 }, type: "hushPuppy" },
    h1: {
      config: { times: { x: 2 } },
      position: { x: 2, y: 1, z: 3 },
      type: "hushPuppy",
    },
    h2: { config: {}, position: { x: 4, y: 0, z: 1 }, type: "hushPuppy" },
    h3: { config: {}, position: { x: 4, y: 1, z: 2 }, type: "hushPuppy" },
    pi: {
      config: { gives: "doughnuts" },
      position: { x: 7, y: 0, z: 3 },
      type: "pickup",
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
      config: { direction: "away", tiles: ["loop"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "away",
        tiles: ["loop", "skeleton", "skeleton", "skeleton", "loop"],
      },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w6: {
      config: { direction: "left", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
