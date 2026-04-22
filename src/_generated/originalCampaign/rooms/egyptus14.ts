import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  height: 11,
  id: "egyptus14",
  items: {
    b: {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 2, y: 9, z: 1 },
      type: "block",
    },
    b1: {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 4 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 6 },
      type: "block",
    },
    b4: {
      config: { style: "organic" },
      position: { x: 7, y: 1, z: 7 },
      type: "block",
    },
    b5: {
      config: { style: "organic" },
      position: { x: 7, y: 3, z: 2 },
      type: "block",
    },
    d: {
      config: { direction: "away", toRoom: "egyptus18" },
      position: { x: 3, y: 10, z: 3 },
      type: "door",
    },
    f: {
      config: { floorType: "none", times: { x: 8, y: 10 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 0, top: 11 },
      position: { x: 0, y: 9, z: 0 },
      type: "lift",
    },
    w: {
      config: { direction: "right", times: { y: 10 } },
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
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 0, y: 10, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 5, y: 10, z: 0 },
      type: "wall",
    },
    w4: {
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
          "sarcophagus",
          "hieroglyphics",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus19",
  roomBelow: "egyptus13",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
