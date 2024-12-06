import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "dimmed" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth36",
  items: {
    "door@0,2,0:uMIUW": {
      config: { direction: "right", toRoom: "blacktooth35" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@2,6,0:xRwHb": {
      config: { direction: "away", toRoom: "blacktooth37" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 6 },
  walls: {
    away: ["plain", "shield", "none", "none", "shield", "plain"],
    left: ["plain", "armour", "shield", "shield", "armour", "plain"],
  },
} satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
