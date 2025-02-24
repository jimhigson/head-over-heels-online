import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "egyptus",
  id: "egyptus34fish",
  items: {
    "ball@0,2,1": { config: {}, position: { x: 0, y: 2, z: 1 }, type: "ball" },
    "block@0,2,0": {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    "block@0,6,0": {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 0, y: 6, z: 0 },
      type: "block",
    },
    "block@0,7,1": {
      config: { style: "artificial", times: { z: 4 } },
      position: { x: 0, y: 7, z: 1 },
      type: "block",
    },
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "egyptus33" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "door@2,8,0": {
      config: { direction: "away", toRoom: "egyptus35" },
      position: { x: 2, y: 8, z: 0 },
      type: "door",
    },
    "monster@5,4,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 5, y: 4, z: 0 },
      type: "monster",
    },
    "pickup@0,7,5": {
      config: { gives: "reincarnation" },
      position: { x: 0, y: 7, z: 5 },
      type: "pickup",
    },
  },
  planet: "egyptus",
  size: { x: 6, y: 8 },
  walls: {
    away: [
      "hieroglyphics",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "hieroglyphics",
    ],
    left: [
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
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
