import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "penitentiary",
  floorSkip: [],
  id: "penitentiary25",
  items: {
    "door@0,0,0:Z4XVYv": {
      config: { direction: "towards", toRoom: "penitentiary24" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,0:ZtKoND": {
      config: { direction: "away", toRoom: "penitentiary26" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "penitentiary",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
    left: [
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
    ],
  },
} satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
