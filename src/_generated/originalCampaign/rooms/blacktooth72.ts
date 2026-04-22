import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "blacktooth72",
  items: {
    b: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 2, z: 2 },
      type: "block",
    },
    b1: {
      config: { style: "organic" },
      position: { x: 7, y: 4, z: 1 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "tower", times: { y: 2, z: 2 } },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth78" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "towards", toRoom: "blacktooth71" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "blacktooth73" },
      position: { x: 8, y: 2, z: 4 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 6 },
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
      position: { x: 0, y: 5, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 7, y: 4, z: 0 },
      type: "monster",
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
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: [
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["plain", "shield"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w6: {
      config: { direction: "left", tiles: ["shield", "plain"] },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
