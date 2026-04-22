import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "egyptus38",
  items: {
    b: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 6, y: 1, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 6, y: 6, z: 0 },
      type: "block",
    },
    bl: { config: {}, position: { x: 1, y: 1, z: 3 }, type: "ball" },
    bl1: { config: {}, position: { x: 1, y: 6, z: 3 }, type: "ball" },
    bl2: { config: {}, position: { x: 6, y: 1, z: 3 }, type: "ball" },
    bl3: { config: {}, position: { x: 6, y: 6, z: 3 }, type: "ball" },
    d: {
      config: { direction: "right", toRoom: "egyptus37" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "egyptus39crown" },
      position: { x: 8, y: 3, z: 0 },
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
    pi: {
      config: { gives: "scroll", page: "teleportBack", source: "manual" },
      position: { x: 5, y: 6, z: 6 },
      type: "pickup",
    },
    t: {
      config: {
        activatedOnStoreValue: "planetsLiberated.egyptus",
        times: { x: 2, y: 2 },
        toItemId: "b2",
        toRoom: "egyptus4",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
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
