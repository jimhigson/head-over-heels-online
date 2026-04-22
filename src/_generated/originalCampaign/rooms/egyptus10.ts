import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "egyptus10",
  items: {
    b: {
      config: { style: "organic", times: { z: 5 } },
      position: { x: 8, y: 1, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { y: 3 } },
      position: { x: 8, y: 1, z: 6 },
      type: "block",
    },
    b2: {
      config: { style: "organic", times: { x: 5, y: 5 } },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic", times: { x: 3, y: 3 } },
      position: { x: 2, y: 2, z: 1 },
      type: "block",
    },
    b4: {
      config: { style: "organic" },
      position: { x: 3, y: 3, z: 2 },
      type: "block",
    },
    bl: { config: {}, position: { x: 3, y: 3, z: 3 }, type: "ball" },
    br: {
      config: { axis: "y", times: { z: 6 } },
      position: { x: 7.5, y: 1, z: 0 },
      type: "barrier",
    },
    d: {
      config: { direction: "towards", toRoom: "egyptus9fish" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "egyptus15" },
      position: { x: 5, y: 9, z: 6 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "egyptus11" },
      position: { x: 9, y: 2, z: 7 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "egyptus",
        times: { x: 9, y: 9 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    h: { config: {}, position: { x: 2, y: 8, z: 1 }, type: "hushPuppy" },
    h1: { config: {}, position: { x: 3, y: 8, z: 2 }, type: "hushPuppy" },
    h2: { config: {}, position: { x: 4, y: 8, z: 3 }, type: "hushPuppy" },
    pr: {
      config: { style: "cube" },
      position: { x: 4, y: 8, z: 4 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 9 } },
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
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
      },
      position: { x: 0, y: 9, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 4 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["hieroglyphics", "hieroglyphics"] },
      position: { x: 7, y: 9, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["hieroglyphics", "hieroglyphics"] },
      position: { x: 9, y: 0, z: 0 },
      type: "wall",
    },
    w6: {
      config: {
        direction: "left",
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
      },
      position: { x: 9, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
