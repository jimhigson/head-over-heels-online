import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "blacktooth73",
  items: {
    b: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 5 } },
      position: { x: 3, y: 5, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 3, y: 5, z: 1 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 3, y: 5, z: 4 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth72" },
      position: { x: 0, y: 0, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth74" },
      position: { x: 8, y: 2, z: 2 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 5, y: 5, z: 2 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano" },
      position: { x: 7, y: 5, z: 3 },
      type: "deadlyBlock",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    h: {
      config: { times: { x: 2 } },
      position: { x: 1, y: 0, z: 0 },
      type: "hushPuppy",
    },
    h1: {
      config: { times: { y: 2 } },
      position: { x: 4, y: 2, z: 0 },
      type: "hushPuppy",
    },
    h2: { config: {}, position: { x: 4, y: 0, z: 0 }, type: "hushPuppy" },
    w: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
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
    w2: {
      config: { direction: "left", tiles: ["plain", "shield"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "left", tiles: ["shield", "plain"] },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "right", times: { y: 4 } },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
