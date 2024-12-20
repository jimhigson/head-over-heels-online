import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "penitentiary",
  id: "penitentiary11",
  items: {
    "block@5,5,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    "block@5,5,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 5, y: 5, z: 1 },
      type: "block",
    },
    "block@5,5,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 5, y: 5, z: 2 },
      type: "block",
    },
    "door@0,2,0:1QJCE8": {
      config: { direction: "right", toRoom: "penitentiary12" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@2,0,0:Z4Y61T": {
      config: { direction: "towards", toRoom: "penitentiary10" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "moveableDeadly@5,5,3:Z1nr7Y3": {
      config: { style: "deadFish" },
      position: { x: 5, y: 5, z: 3 },
      type: "moveableDeadly",
    },
  },
  planet: "penitentiary",
  size: { x: 6, y: 6 },
  walls: {
    away: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
    left: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
