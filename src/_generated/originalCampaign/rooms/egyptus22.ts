import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "egyptus22",
  items: {
    br: {
      config: { axis: "y", times: { y: 4, z: 3 } },
      position: { x: 2, y: 2, z: 0 },
      type: "barrier",
    },
    d: {
      config: { direction: "right", toRoom: "egyptus21" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "egyptus23" },
      position: { x: 3, y: 6, z: 0 },
      type: "door",
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
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 4, y: 0, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 4, y: 2, z: 0 },
      type: "monster",
    },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 0, y: 6, z: 0 },
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
