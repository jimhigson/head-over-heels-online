import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "magenta", shade: "basic" },
  floor: "market",
  floorSkip: [],
  id: "blacktooth48market",
  items: {
    "door@0,0,0:Z1wlAU5": {
      config: { direction: "towards", toRoom: "blacktooth47market" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@2,3,0:1nLHW6": {
      config: { direction: "left", toRoom: "blacktooth49market" },
      position: { x: 2, y: 3, z: 0 },
      type: "door",
    },
  },
  planet: "market",
  size: { x: 2, y: 8 },
  walls: {
    away: ["more-fruits", "fruits"],
    left: [
      "passage",
      "more-fruits",
      "fruits",
      "none",
      "none",
      "more-fruits",
      "fruits",
      "passage",
    ],
  },
} satisfies RoomJson<"market", OriginalCampaignRoomId>;
