import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "penitentiary3",
  items: {
    b: {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "artificial" },
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "artificial" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "penitentiary2" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "penitentiary4" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    db: {
      config: { style: "toaster", times: { z: 2 } },
      position: { x: 7, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    mp: {
      config: {
        activated: "off",
        movement: "clockwise",
        startDirection: "left",
      },
      position: { x: 0, y: 1, z: 0 },
      type: "movingPlatform",
    },
    sw: {
      config: {
        initialSetting: "right",
        modifies: [
          { activates: true, expectType: "movingPlatform" },
          { expectType: "switch", flip: true },
        ],
        type: "in-room",
      },
      position: { x: 1, y: 0, z: 0 },
      type: "switch",
    },
    sw1: {
      config: {
        initialSetting: "right",
        modifies: [{ expectType: "switch", flip: true }],
        type: "in-room",
      },
      position: { x: 7, y: 7, z: 0 },
      type: "switch",
    },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    w3: {
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
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
