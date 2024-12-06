import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "dimmed" },
  floor: "safari",
  floorSkip: [],
  id: "safari27",
  items: {
    "baddie@3,3,0:ZVblgD": {
      config: { activated: true, which: "helicopter-bug" },
      position: { x: 3, y: 3, z: 0 },
      type: "baddie",
    },
    "baddie@4,2,0:ZVblgD": {
      config: { activated: true, which: "helicopter-bug" },
      position: { x: 4, y: 2, z: 0 },
      type: "baddie",
    },
    "baddie@4,3,0:Z2qiM0z": {
      config: { activated: true, which: "elephant" },
      position: { x: 4, y: 3, z: 0 },
      type: "baddie",
    },
    "door@0,2,4:Z2p4Aks": {
      config: { direction: "right", toRoom: "safari26" },
      position: { x: 0, y: 2, z: 4 },
      type: "door",
    },
    "door@8,2,4:Z140EHO": {
      config: { direction: "left", toRoom: "safari28" },
      position: { x: 8, y: 2, z: 4 },
      type: "door",
    },
    "spring@3,2,0:13y": {
      config: {},
      position: { x: 3, y: 2, z: 0 },
      type: "spring",
    },
  },
  planet: "safari",
  size: { x: 8, y: 6 },
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
    left: ["wall", "shield", "none", "none", "shield", "wall"],
  },
} satisfies RoomJson<"safari", OriginalCampaignRoomId>;
