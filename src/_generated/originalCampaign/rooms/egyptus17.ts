import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "deadly",
  id: "egyptus17",
  items: {
    "block@0,0,0": {
      config: { style: "organic", times: { x: 7 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,5,0": {
      config: { style: "organic", times: { x: 12 } },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@11,2,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 11, y: 2, z: 0 },
      type: "block",
    },
    "deadlyBlock@4,1,0": {
      config: { style: "spikes" },
      position: { x: 4, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "door@12,2,2": {
      config: { direction: "left", toRoom: "egyptus18" },
      position: { x: 12, y: 2, z: 2 },
      type: "door",
    },
    "door@2,0,1": {
      config: { direction: "towards", toRoom: "egyptus16" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    "monster@5,1,0": {
      config: {
        activated: true,
        movement: "clockwise",
        startDirection: "away",
        which: "turtle",
      },
      position: { x: 5, y: 1, z: 0 },
      type: "monster",
    },
    "portableBlock@1,0,1": {
      config: { style: "sticks" },
      position: { x: 1, y: 0, z: 1 },
      type: "portableBlock",
    },
    "wall@0,0,0:2sckiP": {
      config: { direction: "right", tiles: [], times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoF0v": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
        times: { x: 12 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@12,0,0": {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "hieroglyphics"],
        times: { y: 2 },
      },
      position: { x: 12, y: 0, z: 0 },
      type: "wall",
    },
    "wall@12,4,0": {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "hieroglyphics"],
        times: { y: 2 },
      },
      position: { x: 12, y: 4, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  size: { x: 12, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
