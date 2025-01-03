import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "penitentiary",
  id: "penitentiary7",
  items: {
    "baddie@3,5,0:Z1WWFt6": {
      config: { activated: true, which: "bubble-robot" },
      position: { x: 3, y: 5, z: 0 },
      type: "baddie",
    },
    "baddie@5,5,0:Z1WWFt6": {
      config: { activated: true, which: "bubble-robot" },
      position: { x: 5, y: 5, z: 0 },
      type: "baddie",
    },
    "block@4,5,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 5, z: 0 },
      type: "block",
    },
    "block@4,5,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 5, z: 1 },
      type: "block",
    },
    "block@4,5,3:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 5, z: 3 },
      type: "block",
    },
    "door@0,2,0:RGN6D": {
      config: { direction: "right", toRoom: "penitentiary6" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@3,6,5:2r8kBv": {
      config: { direction: "away", toRoom: "penitentiary8" },
      position: { x: 3, y: 6, z: 5 },
      type: "door",
    },
  },
  planet: "penitentiary",
  size: { x: 8, y: 6 },
  walls: {
    away: [
      "loop",
      "skeleton",
      "loop",
      "none",
      "none",
      "loop",
      "skeleton",
      "loop",
    ],
    left: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
