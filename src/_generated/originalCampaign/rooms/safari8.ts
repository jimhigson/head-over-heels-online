import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "green", shade: "basic" },
  floor: "safari",
  floorSkip: [],
  id: "safari8",
  items: {
    "door@0,0,1:Z2wPg5W": {
      config: { direction: "right", toRoom: "safari7" },
      position: { x: 0, y: 0, z: 1 },
      type: "door",
    },
    "door@8,0,1:LV3Ic": {
      config: { direction: "left", toRoom: "safari9" },
      position: { x: 8, y: 0, z: 1 },
      type: "door",
    },
  },
  planet: "safari",
  size: { x: 8, y: 2 },
  walls: {
    away: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
    left: ["none", "none"],
  },
} satisfies RoomJson<"safari", OriginalCampaignRoomId>;
