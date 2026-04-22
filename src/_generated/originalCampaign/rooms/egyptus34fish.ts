import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "egyptus34fish",
  items: {
    b: {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 0, y: 6, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "artificial", times: { z: 4 } },
      position: { x: 0, y: 7, z: 1 },
      type: "block",
    },
    bl: { config: {}, position: { x: 0, y: 2, z: 1 }, type: "ball" },
    d: {
      config: { direction: "towards", toRoom: "egyptus33" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "egyptus35" },
      position: { x: 2, y: 8, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "egyptus",
        times: { x: 6, y: 8 },
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
      position: { x: 5, y: 4, z: 0 },
      type: "monster",
    },
    pi: {
      config: { gives: "reincarnation" },
      position: { x: 0, y: 7, z: 5 },
      type: "pickup",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["hieroglyphics", "hieroglyphics"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["hieroglyphics", "hieroglyphics"] },
      position: { x: 4, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: [
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
        ],
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
