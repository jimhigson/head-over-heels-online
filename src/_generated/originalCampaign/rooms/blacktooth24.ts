import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "blacktooth24",
  items: {
    b: {
      config: { style: "book", times: { z: 3 } },
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "book", times: { z: 6 } },
      position: { x: 5, y: 7, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "tower", times: { z: 6 } },
      position: { x: 6, y: 7, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "left", toRoom: "blacktooth25" },
      position: { x: 8, y: 3, z: 3 },
      type: "door",
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
    pi: {
      config: { gives: "extra-life" },
      position: { x: 6, y: 7, z: 6 },
      type: "pickup",
    },
    sg: { config: {}, position: { x: 4, y: 3.5, z: 0 }, type: "spring" },
    t: {
      config: { toRoom: "blacktooth23heels" },
      position: { x: 0, y: 0, z: 0 },
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
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
