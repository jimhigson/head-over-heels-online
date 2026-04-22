import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "egyptus25",
  items: {
    d: {
      config: { direction: "right", toRoom: "egyptus27" },
      position: { x: 0, y: 1, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "egyptus26" },
      position: { x: 3, y: 4, z: 0 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "egyptus24" },
      position: { x: 8, y: 1, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "egyptus",
        times: { x: 8, y: 4 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "right" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right" },
      position: { x: 0, y: 3, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 5, y: 4, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["hieroglyphics"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w6: {
      config: { direction: "left", tiles: ["hieroglyphics"] },
      position: { x: 8, y: 3, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
