import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "cyan", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth15",
  items: {
    "door@0,0,0:Z1V8bpu": {
      config: { direction: "towards", toRoom: "blacktooth13" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,0:xRgqF": {
      config: { direction: "away", toRoom: "blacktooth16" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
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
