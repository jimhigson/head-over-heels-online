import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "cyan", shade: "dimmed" },
  floor: "safari",
  floorSkip: [],
  id: "safari30",
  items: {
    "door@0,0,0:ZMLAn7": {
      config: { direction: "towards", toRoom: "safari17fish" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,3,5:Z2p4zyc": {
      config: { direction: "right", toRoom: "safari29" },
      position: { x: 0, y: 3, z: 5 },
      type: "door",
    },
  },
  planet: "safari",
  size: { x: 2, y: 8 },
  walls: {
    away: ["wall", "wall"],
    left: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
  },
} satisfies RoomJson<"safari", OriginalCampaignRoomId>;
