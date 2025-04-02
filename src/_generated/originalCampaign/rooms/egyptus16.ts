import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "none",
  id: "egyptus16",
  items: {
    "block@0,5,0": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    blockAddedToSplitAfterExistingBlockCausedCyclicZOrder: {
      config: { style: "organic", times: { x: 4 } },
      position: { x: 2, y: 5, z: 0 },
      type: "block",
    },
    "door@2,6,1": {
      config: {
        direction: "away",
        meta: { toSubRoom: "right" },
        toRoom: "egyptus17",
      },
      position: { x: 2, y: 6, z: 1 },
      type: "door",
    },
    "wall@0,0,0:2sckiP": {
      config: { direction: "right", tiles: [], times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDXu": {
      config: { direction: "towards", tiles: [], times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "hieroglyphics"],
        times: { x: 2 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,6,0": {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "hieroglyphics"],
        times: { x: 2 },
      },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
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
        times: { y: 6 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  roomBelow: "egyptus15",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
