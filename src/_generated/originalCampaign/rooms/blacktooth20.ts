import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth20",
  items: {
    "door@0,2,0:uMtGs": {
      config: { direction: "right", toRoom: "blacktooth18" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@2,0,0:Z1V89QX": {
      config: { direction: "towards", toRoom: "blacktooth19" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "door@2,6,0:ZqLhxe": {
      config: { direction: "away", toRoom: "blacktooth21fish" },
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
