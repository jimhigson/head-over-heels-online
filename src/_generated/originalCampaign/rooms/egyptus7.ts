import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "egyptus7",
  items: {
    b: {
      config: { style: "organic", times: { x: 2, y: 2 } },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 2, y: 2 } },
      position: { x: 0, y: 6, z: 3 },
      type: "block",
    },
    b2: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 0, z: 3 },
      type: "block",
    },
    b3: {
      config: { style: "organic", times: { x: 2, y: 2 } },
      position: { x: 6, y: 6, z: 3 },
      type: "block",
    },
    b4: {
      config: { style: "tower", times: { x: 2, y: 2, z: 3 } },
      position: { x: 0, y: 6, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "tower", times: { y: 2, z: 3 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    b6: {
      config: { style: "tower", times: { x: 2, y: 2, z: 3 } },
      position: { x: 6, y: 6, z: 0 },
      type: "block",
    },
    b7: {
      config: { style: "tower", times: { x: 2, y: 2, z: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "egyptus5" },
      position: { x: 0, y: 0, z: 4 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "egyptus8" },
      position: { x: 8, y: 0, z: 4 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: {
        direction: "away",
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
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "left",
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
      },
      position: { x: 8, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
