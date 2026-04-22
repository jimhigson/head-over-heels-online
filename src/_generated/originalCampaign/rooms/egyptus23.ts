import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "egyptus23",
  items: {
    b: {
      config: { style: "organic" },
      position: { x: 0, y: 3, z: 5 },
      type: "block",
    },
    b1: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 0, y: 4, z: 5 },
      type: "block",
    },
    b2: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 5, z: 5 },
      type: "block",
    },
    b3: {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    b5: {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { z: 3 },
      },
      position: { x: 7, y: 5, z: 1 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "egyptus22" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "egyptus24" },
      position: { x: 3, y: 6, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { x: 3, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "egyptus",
        times: { x: 8, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "extra-life" },
      position: { x: 0, y: 3, z: 6 },
      type: "pickup",
    },
    sk: { config: {}, position: { x: 7, y: 2, z: 0 }, type: "spikes" },
    sk1: { config: {}, position: { x: 7, y: 4, z: 0 }, type: "spikes" },
    w: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 5, y: 6, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
