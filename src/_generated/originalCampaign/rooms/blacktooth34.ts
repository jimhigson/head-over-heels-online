import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "cyan", shade: "basic" },
  floor: "none",
  floorSkip: [],
  id: "blacktooth34",
  items: {
    "block@3,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@5,7,0:95uHj": {
      config: { disappearing: true, style: "organic" },
      position: { x: 5, y: 7, z: 0 },
      type: "block",
    },
    "door@3,8,2:xRwbF": {
      config: { direction: "away", toRoom: "blacktooth35" },
      position: { x: 3, y: 8, z: 2 },
      type: "door",
    },
    "lift@7,7,0:ZTwqp2": {
      config: { bottom: 0, top: 6 },
      position: { x: 7, y: 7, z: 0 },
      type: "lift",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth33",
  size: { x: 8, y: 8 },
  walls: {
    away: ["bars", "bars", "bars", "none", "none", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
  },
} satisfies RoomJson<"jail", OriginalCampaignRoomId>;
