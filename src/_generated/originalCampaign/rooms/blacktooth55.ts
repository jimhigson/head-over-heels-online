import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "dimmed" },
  floor: "market",
  floorSkip: [],
  id: "blacktooth55",
  items: {
    "door@0,2,0:uN0cs": {
      config: { direction: "right", toRoom: "blacktooth56" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@3,6,0:xRTaM": {
      config: { direction: "away", toRoom: "blacktooth61" },
      position: { x: 3, y: 6, z: 0 },
      type: "door",
    },
    "lift@3,0,0:ZTwqnv": {
      config: { bottom: 0, top: 9 },
      position: { x: 3, y: 0, z: 0 },
      type: "lift",
    },
  },
  planet: "jail",
  roomAbove: "blacktooth54",
  size: { x: 8, y: 6 },
  walls: {
    away: ["bars", "bars", "bars", "none", "none", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars"],
  },
} satisfies RoomJson<"jail", OriginalCampaignRoomId>;
