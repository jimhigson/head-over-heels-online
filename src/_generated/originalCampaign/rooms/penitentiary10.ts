import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "none",
  id: "penitentiary10",
  items: {
    "block@0,4,0": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@0,7,0": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@1,7,0": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "door@0,8,2": {
      config: { direction: "away", toRoom: "penitentiary11" },
      position: { x: 0, y: 8, z: 2 },
      type: "door",
    },
  },
  planet: "penitentiary",
  roomBelow: "penitentiary9",
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
