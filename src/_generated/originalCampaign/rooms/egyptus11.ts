import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "cyan", shade: "dimmed" },
  floor: "egyptus",
  floorSkip: [],
  id: "egyptus11",
  items: {
    "door@0,0,0:2rMnfm": {
      config: { direction: "right", toRoom: "egyptus10" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,0:Z1B0ott": {
      config: { direction: "left", toRoom: "egyptus12" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 2 },
  walls: {
    away: [
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
    ],
    left: ["none", "none"],
  },
} satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
