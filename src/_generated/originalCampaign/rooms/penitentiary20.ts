import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  height: 13,
  id: "penitentiary20",
  items: {
    b: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 6, z: 14 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 6, y: -1, z: 14 },
      type: "block",
    },
    b2: {
      config: { style: "organic", times: { y: 8 } },
      position: { x: -1, y: -1, z: 14 },
      type: "block",
    },
    b3: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 0, y: 0, z: 14 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: -1, z: 14 },
      type: "block",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 6, y: 6 },
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
      position: { x: 2, y: 3, z: 1 },
      type: "monster",
    },
    pr: {
      config: { style: "cube" },
      position: { x: 1, y: 1, z: 0 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "cube" },
      position: { x: 1, y: 4, z: 0 },
      type: "portableBlock",
    },
    pr2: {
      config: { style: "cube" },
      position: { x: 2, y: 2, z: 0 },
      type: "portableBlock",
    },
    pr3: {
      config: { style: "cube" },
      position: { x: 2, y: 3, z: 0 },
      type: "portableBlock",
    },
    pr4: {
      config: { style: "cube" },
      position: { x: 3, y: 2, z: 0 },
      type: "portableBlock",
    },
    pr5: {
      config: { style: "cube" },
      position: { x: 3, y: 3, z: 0 },
      type: "portableBlock",
    },
    pr6: {
      config: { style: "cube" },
      position: { x: 4, y: 1, z: 0 },
      type: "portableBlock",
    },
    sg: { config: {}, position: { x: 3, y: 2, z: 1 }, type: "spring" },
    w: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
        tiles: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "left",
        tiles: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary21",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
