import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  height: 12,
  id: "egyptus13",
  items: {
    b: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 2, y: 0, z: 4 },
      type: "block",
    },
    b1: {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 6 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "egyptus12" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "egyptus",
        times: { x: 8, y: 10 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 2, top: 5 },
      position: { x: 0, y: 0, z: 2 },
      type: "lift",
    },
    pu: { config: {}, position: { x: 1, y: 0, z: 0 }, type: "pushableBlock" },
    sg: { config: {}, position: { x: 7, y: 0, z: 7 }, type: "spring" },
    t: {
      config: { toRoom: "egyptus9fish" },
      position: { x: 4, y: 0, z: 5 },
      type: "teleporter",
    },
    w: {
      config: { direction: "right", times: { y: 10 } },
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
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
        ],
      },
      position: { x: 0, y: 10, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
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
  roomAbove: "egyptus14",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
