import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "egyptus",
  id: "egyptus22",
  items: {
    "barrier@2,2,0": {
      config: { axis: "y", times: { y: 4, z: 3 } },
      position: { x: 2, y: 2, z: 0 },
      type: "barrier",
    },
    "door@0,2,0": {
      config: { direction: "right", toRoom: "egyptus21" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@3,6,0": {
      config: { direction: "away", toRoom: "egyptus23" },
      position: { x: 3, y: 6, z: 0 },
      type: "door",
    },
    "monster@4,0,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 4, y: 0, z: 0 },
      type: "monster",
    },
    "monster@4,2,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 4, y: 2, z: 0 },
      type: "monster",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 6 },
  walls: {
    away: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
    left: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
