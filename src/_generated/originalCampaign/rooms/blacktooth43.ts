import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "none",
  floorSkip: [],
  id: "blacktooth43",
  items: {
    "block@0,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    "block@0,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "door@0,2,1:uMQa4": {
      config: { direction: "right", toRoom: "blacktooth42" },
      position: { x: 0, y: 2, z: 1 },
      type: "door",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth46market",
  size: { x: 6, y: 6 },
  walls: {
    away: ["bars", "bars", "bars", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
