import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "egyptus2",
  items: {
    b: {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "artificial", times: { x: 2, y: 2 } },
      position: { x: 6, y: 3, z: 3 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "egyptus1" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "egyptus3" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
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
    h: {
      config: { times: { y: 2 } },
      position: { x: 3, y: 3, z: 0 },
      type: "hushPuppy",
    },
    h1: {
      config: { times: { y: 2 } },
      position: { x: 4, y: 3, z: 1 },
      type: "hushPuppy",
    },
    h2: {
      config: { times: { y: 2 } },
      position: { x: 5, y: 3, z: 2 },
      type: "hushPuppy",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 2, y: 3, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "monster",
    },
    sg: { config: {}, position: { x: 6, y: 3.5, z: 4 }, type: "spring" },
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
    w4: {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
