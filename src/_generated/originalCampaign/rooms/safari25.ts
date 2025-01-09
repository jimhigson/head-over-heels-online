import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "deadly",
  id: "safari25",
  items: {
    "block@3,0,0": {
      config: { style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,4,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    "block@7,4,0": {
      config: { style: "organic" },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    "door@3,0,3": {
      config: { direction: "towards", toRoom: "safari19triple" },
      position: { x: 3, y: 0, z: 3 },
      type: "door",
    },
    "door@8,3,3": {
      config: { direction: "left", toRoom: "safari24" },
      position: { x: 8, y: 3, z: 3 },
      type: "door",
    },
  },
  planet: "safari",
  size: { x: 8, y: 8 },
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
    left: ["wall", "shield", "wall", "none", "none", "wall", "window", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
