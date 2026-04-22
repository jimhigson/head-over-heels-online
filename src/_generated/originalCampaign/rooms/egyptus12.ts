import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "egyptus12",
  items: {
    b: {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 2, y: 3, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic" },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    ch: { config: {}, position: { x: 7, y: 2, z: 1 }, type: "charles" },
    d: {
      config: { direction: "right", toRoom: "egyptus11" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "egyptus13" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 6, y: 4, z: 3 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 7, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano", times: { y: 3 } },
      position: { x: 7, y: 1, z: 3 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 7, y: 5, z: 3 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "egyptus",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    j: { config: {}, position: { x: 2, y: 3, z: 1 }, type: "joystick" },
    j1: { config: {}, position: { x: 3, y: 2, z: 1 }, type: "joystick" },
    j2: { config: {}, position: { x: 3, y: 4, z: 1 }, type: "joystick" },
    j3: { config: {}, position: { x: 4, y: 3, z: 1 }, type: "joystick" },
    l: {
      config: { bottom: 0, top: 8 },
      position: { x: 7, y: 0, z: 0 },
      type: "lift",
    },
    pu: { config: {}, position: { x: 6, y: 4, z: 4 }, type: "pushableBlock" },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 5, y: 8, z: 0 },
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
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
