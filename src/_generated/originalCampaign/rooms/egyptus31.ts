import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "basic" },
  floor: "egyptus",
  floorSkip: [],
  id: "egyptus31",
  items: {
    "baddie@2,0,0:Z1WWFt6": {
      config: { activated: true, which: "bubble-robot" },
      position: { x: 2, y: 0, z: 0 },
      type: "baddie",
    },
    "door@0,3,0:2rMDLC": {
      config: { direction: "right", toRoom: "egyptus32" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "lift@5,0,0:ZTwqnv": {
      config: { bottom: 0, top: 9 },
      position: { x: 5, y: 0, z: 0 },
      type: "lift",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus30",
  size: { x: 6, y: 8 },
  walls: {
    away: [
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
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
    ],
  },
} satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
