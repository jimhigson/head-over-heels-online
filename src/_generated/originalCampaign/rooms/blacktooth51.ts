import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "basic" },
  floor: "market",
  floorSkip: [],
  id: "blacktooth51",
  items: {
    "door@2,8,0:Z2shRzG": {
      config: { direction: "away", toRoom: "blacktooth50market" },
      position: { x: 2, y: 8, z: 0 },
      type: "door",
    },
    "teleporter@2,3,0:Z1GJrKi": {
      config: { toRoom: "moonbase1" },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@2,4,0:Z1GJrKi": {
      config: { toRoom: "moonbase1" },
      position: { x: 2, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,3,0:Z1GJrKi": {
      config: { toRoom: "moonbase1" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0:Z1GJrKi": {
      config: { toRoom: "moonbase1" },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "jail",
  size: { x: 6, y: 8 },
  walls: {
    away: ["bars", "bars", "none", "none", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
  },
} satisfies RoomJson<"jail", OriginalCampaignRoomId>;
