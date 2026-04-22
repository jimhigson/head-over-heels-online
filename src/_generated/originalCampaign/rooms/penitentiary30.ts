import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "penitentiary30",
  items: {
    b: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    d: {
      config: { direction: "away", toRoom: "penitentiary28" },
      position: { x: 3, y: 4, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 8, y: 4 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pr: {
      config: { style: "sticks" },
      position: { x: 0, y: 3, z: 0 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "sticks" },
      position: { x: 7, y: 0, z: 0 },
      type: "portableBlock",
    },
    pr2: {
      config: { style: "sticks" },
      position: { x: 7, y: 3, z: 0 },
      type: "portableBlock",
    },
    t: {
      config: { toItemId: "t", toRoom: "penitentiary18fish" },
      position: { x: 0, y: 3, z: 4 },
      type: "teleporter",
    },
    w: {
      config: { direction: "right", times: { y: 4 } },
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
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 5, y: 4, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: ["loop", "loop", "skeleton", "loop"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
