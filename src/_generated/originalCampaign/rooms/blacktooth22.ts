import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "dimmed" },
  floor: "none",
  floorSkip: [],
  id: "blacktooth22",
  items: {
    "block@2,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@3,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "door@2,0,1:Z1DkXpL": {
      config: { direction: "towards", toRoom: "blacktooth21fish" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth44market",
  size: { x: 6, y: 6 },
  walls: {
    away: ["bars", "bars", "bars", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars"],
  },
} satisfies RoomJson<"jail", OriginalCampaignRoomId>;
