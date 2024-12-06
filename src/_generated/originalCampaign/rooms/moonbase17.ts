import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "moonbase",
  floorSkip: [],
  id: "moonbase17",
  items: {
    "door@2,6,0:11gSLD": {
      config: { direction: "away", toRoom: "moonbase16" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    "teleporter@2,2,0:Z1R6znp": {
      config: { toRoom: "moonbase18" },
      position: { x: 2, y: 2, z: 0 },
      type: "teleporter",
    },
    "teleporter@2,3,0:Z1R6znp": {
      config: { toRoom: "moonbase18" },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,2,0:Z1R6znp": {
      config: { toRoom: "moonbase18" },
      position: { x: 3, y: 2, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,3,0:Z1R6znp": {
      config: { toRoom: "moonbase18" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
  },
  planet: "moonbase",
  size: { x: 6, y: 6 },
  walls: {
    away: ["window3", "window2", "none", "none", "window2", "window1"],
    left: ["window1", "coil", "window3", "window2", "coil", "window1"],
  },
} satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
