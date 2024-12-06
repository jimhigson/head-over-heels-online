import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  floorSkip: [],
  id: "egyptus37",
  items: {
    "block@0,0,0:8iyRr": {
      config: { disappearing: true, style: "artificial" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@1,3,0:8iyRr": {
      config: { disappearing: true, style: "artificial" },
      position: { x: 1, y: 3, z: 0 },
      type: "block",
    },
    "block@1,4,0:8iyRr": {
      config: { disappearing: true, style: "artificial" },
      position: { x: 1, y: 4, z: 0 },
      type: "block",
    },
    "door@2,3,2:Z1B06Uc": {
      config: { direction: "left", toRoom: "egyptus38" },
      position: { x: 2, y: 3, z: 2 },
      type: "door",
    },
  },
  planet: "egyptus",
  roomBelow: "egyptus36",
  size: { x: 2, y: 8 },
  walls: {
    away: ["hieroglyphics", "hieroglyphics"],
    left: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
  },
} satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
