import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "blacktooth78",
  items: {
    b: {
      config: { style: "organic" },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "tower", times: { x: 2, z: 3 } },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 7, z: 3 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "tower", times: { y: 2, z: 2 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 0, z: 2 },
      type: "block",
    },
    d: {
      config: { direction: "away", toRoom: "blacktooth80" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth72" },
      position: { x: 8, y: 0, z: 5 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 1, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 0, top: 11 },
      position: { x: 1, y: 1, z: 0 },
      type: "lift",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 4, y: 4, z: 0 },
      type: "monster",
    },
    mp: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
      },
      position: { x: 1, y: 1, z: 1 },
      type: "movingPlatform",
    },
    pu: { config: {}, position: { x: 0, y: 1, z: 1 }, type: "pushableBlock" },
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
      config: { direction: "away", tiles: ["plain", "shield", "plain"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["plain", "shield", "plain"] },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: ["armour", "plain", "shield", "shield", "plain", "armour"],
      },
      position: { x: 8, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  roomAbove: "blacktooth79fish",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
