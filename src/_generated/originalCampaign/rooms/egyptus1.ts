import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "egyptus",
  id: "egyptus1",
  items: {
    "door@8,3,0": {
      config: { direction: "left", toRoom: "egyptus2" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "teleporter@3,3,0": {
      config: {
        toPosition: { x: 3, y: 3, z: 0 },
        toRoom: "moonbase24toegyptus",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0": {
      config: {
        toPosition: { x: 3, y: 4, z: 0 },
        toRoom: "moonbase24toegyptus",
      },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@4,3,0": {
      config: {
        toPosition: { x: 4, y: 3, z: 0 },
        toRoom: "moonbase24toegyptus",
      },
      position: { x: 4, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@4,4,0": {
      config: {
        toPosition: { x: 4, y: 4, z: 0 },
        toRoom: "moonbase24toegyptus",
      },
      position: { x: 4, y: 4, z: 0 },
      type: "teleporter",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
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
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
