import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "dimmed" },
  floor: "market",
  floorSkip: [],
  id: "blacktooth46market",
  items: {
    "door@2,0,0:Z2ksHaW": {
      config: { direction: "towards", toRoom: "blacktooth45market" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "door@2,6,3:Z1WhO4f": {
      config: { direction: "away", toRoom: "blacktooth47market" },
      position: { x: 2, y: 6, z: 3 },
      type: "door",
    },
    "portableBlock@0,0,0:Z1UEQTQ": {
      config: { style: "cube" },
      position: { x: 0, y: 0, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "market",
  roomAbove: "blacktooth43",
  size: { x: 6, y: 6 },
  walls: {
    away: ["more-fruits", "fruits", "none", "none", "more-fruits", "fruits"],
    left: [
      "passage",
      "more-fruits",
      "fruits",
      "more-fruits",
      "fruits",
      "passage",
    ],
  },
} satisfies RoomJson<"market", OriginalCampaignRoomId>;
