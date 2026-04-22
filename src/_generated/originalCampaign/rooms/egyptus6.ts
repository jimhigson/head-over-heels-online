import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "egyptus6",
  items: {
    b: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 4, y: 3, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "egyptus5" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "egyptus8" },
      position: { x: 3, y: 8, z: 5 },
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
    pu: { config: {}, position: { x: 2, y: 2, z: 0 }, type: "pushableBlock" },
    pu1: { config: {}, position: { x: 2, y: 2, z: 1 }, type: "pushableBlock" },
    pu2: { config: {}, position: { x: 4, y: 3, z: 3 }, type: "pushableBlock" },
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
