import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "egyptus15",
  items: {
    b: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 0, y: 5, z: 2 },
      type: "block",
    },
    b1: {
      config: { style: "organic" },
      position: { x: 0, y: 5, z: 6 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 1, y: 5, z: 1 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 1, y: 5, z: 5 },
      type: "block",
    },
    b4: {
      config: { style: "organic" },
      position: { x: 2, y: 5, z: 3 },
      type: "block",
    },
    b5: {
      config: { style: "organic" },
      position: { x: 3, y: 5, z: 1 },
      type: "block",
    },
    b6: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 3, y: 5, z: 4 },
      type: "block",
    },
    b7: {
      config: { style: "organic" },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    b8: {
      config: { style: "organic" },
      position: { x: 3, y: 5, z: 0 },
      type: "block",
    },
    b9: {
      config: { style: "organic" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "egyptus10" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "egyptus",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    sg: { config: {}, position: { x: 0, y: 5, z: 7 }, type: "spring" },
    sk: { config: {}, position: { x: 0, y: 5, z: 0 }, type: "spikes" },
    w: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
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
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus16",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
