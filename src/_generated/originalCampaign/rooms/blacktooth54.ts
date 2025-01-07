import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "none",
  id: "blacktooth54",
  items: {
    "block@3,0,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@4,0,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "door@3,0,1": {
      config: { direction: "towards", toRoom: "blacktooth53market" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth55",
  size: { x: 8, y: 6 },
  walls: {
    away: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
