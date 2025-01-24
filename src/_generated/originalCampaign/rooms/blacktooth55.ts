import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "market",
  id: "blacktooth55",
  items: {
    "door@0,2,0": {
      config: { direction: "right", toRoom: "blacktooth56" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@3,6,0": {
      config: { direction: "away", toRoom: "blacktooth61" },
      position: { x: 3, y: 6, z: 0 },
      type: "door",
    },
    "lift@3,0,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 3, y: 0, z: 0 },
      type: "lift",
    },
    scroll: {
      config: { gives: "scroll", page: "hushPuppies" },
      position: { x: 5, y: 5, z: 0 },
      type: "pickup",
    },
  },
  planet: "jail",
  roomAbove: "blacktooth54",
  size: { x: 8, y: 6 },
  walls: {
    away: ["bars", "bars", "bars", "none", "none", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
