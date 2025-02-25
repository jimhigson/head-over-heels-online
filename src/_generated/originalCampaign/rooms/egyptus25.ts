import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "egyptus",
  id: "egyptus25",
  items: {
    "door@0,1,0": {
      config: { direction: "right", toRoom: "egyptus27" },
      position: { x: 0, y: 1, z: 0 },
      type: "door",
    },
    "door@3,4,0": {
      config: { direction: "away", toRoom: "egyptus26" },
      position: { x: 3, y: 4, z: 0 },
      type: "door",
    },
    "door@8,1,0": {
      config: { direction: "left", toRoom: "egyptus24" },
      position: { x: 8, y: 1, z: 0 },
      type: "door",
    },
    "wall@0,0,0:Z1Ibm7P": {
      config: { direction: "right", tiles: [] },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,3,0": {
      config: { direction: "right", tiles: [] },
      position: { x: 0, y: 3, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
        times: { x: 3 },
      },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@5,4,0": {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
        times: { x: 3 },
      },
      position: { x: 5, y: 4, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["hieroglyphics"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,3,0": {
      config: { direction: "left", tiles: ["hieroglyphics"] },
      position: { x: 8, y: 3, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 4 },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
