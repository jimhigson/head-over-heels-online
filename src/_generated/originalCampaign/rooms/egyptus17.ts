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
  },
  planet: "egyptus",
  size: { x: 12, y: 6 },
  walls: {
    away: [
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
    left: [
      "hieroglyphics",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
