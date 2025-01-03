import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "penitentiary",
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
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
