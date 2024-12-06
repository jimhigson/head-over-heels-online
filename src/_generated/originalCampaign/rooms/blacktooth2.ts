import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "cyan", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth2",
  items: {
    "door@2,0,0:Z1cQbMN": {
      config: { direction: "towards", toRoom: "blacktooth3" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "teleporter@5,7,0:ZO2t8x": {
      config: { toRoom: "blacktooth1head" },
      position: { x: 5, y: 7, z: 0 },
      type: "teleporter",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 8 },
  walls: {
    away: ["plain", "armour", "shield", "shield", "armour", "plain"],
    left: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
  },
} satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
