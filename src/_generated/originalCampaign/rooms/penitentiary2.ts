import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "penitentiary2",
  items: {
    b: {
      config: { style: "artificial", times: { x: 2, y: 2 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "artificial", times: { z: 2 } },
      position: { x: 6, y: 3, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "artificial", times: { x: 2 } },
      position: { x: 6, y: 3, z: 3 },
      type: "block",
    },
    b3: {
      config: { style: "artificial" },
      position: { x: 7, y: 4, z: 3 },
      type: "block",
    },
    b4: {
      config: { style: "artificial", times: { x: 2, z: 4 } },
      position: { x: 3, y: 9, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "penitentiary1" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "penitentiary13" },
      position: { x: 3, y: 10, z: 5 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "penitentiary3" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 8, y: 10 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    h: { config: {}, position: { x: 0, y: 9, z: 0 }, type: "hushPuppy" },
    h1: { config: {}, position: { x: 1, y: 9, z: 1 }, type: "hushPuppy" },
    h2: { config: {}, position: { x: 2, y: 9, z: 2 }, type: "hushPuppy" },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 6, y: 3, z: 2 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 2, y: 9, z: 3 },
      type: "monster",
    },
    w: {
      config: { direction: "right", times: { y: 10 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 0, y: 10, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 5, y: 10, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w6: {
      config: {
        direction: "left",
        tiles: ["loop", "loop", "skeleton", "loop", "loop"],
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
