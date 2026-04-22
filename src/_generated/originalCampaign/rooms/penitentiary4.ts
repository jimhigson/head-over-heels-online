import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  height: 11,
  id: "penitentiary4",
  items: {
    b: {
      config: { style: "artificial", times: { z: 2 } },
      position: { x: 4, y: 5, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "artificial", times: { z: 5 } },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "artificial" },
      position: { x: 5, y: 0, z: 7 },
      type: "block",
    },
    b3: {
      config: { style: "artificial", times: { z: 3 } },
      position: { x: 5, y: 1, z: 0 },
      type: "block",
    },
    b4: {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 5, y: 2, z: 6 },
      type: "block",
    },
    b5: {
      config: { style: "artificial", times: { z: 3 } },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "penitentiary3" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
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
    sk: {
      config: { times: { y: 2 } },
      position: { x: 5, y: 2, z: 0 },
      type: "spikes",
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
        tiles: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary5",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
