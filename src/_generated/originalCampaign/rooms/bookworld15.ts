import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "deadly",
  id: "bookworld15",
  items: {
    "block@0,0,0": {
      config: { disappearing: "onStand", style: "book" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,3,0": {
      config: { disappearing: "onStand", style: "book" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,7,0": {
      config: { disappearing: "onStand", style: "book" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@3,7,0": {
      config: { style: "book" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@4,0,0": {
      config: { style: "book" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "door@3,0,1": {
      config: { direction: "towards", toRoom: "bookworld16" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    "door@3,8,3": {
      config: { direction: "away", toRoom: "bookworld14" },
      position: { x: 3, y: 8, z: 3 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "person", "none", "none", "person", "book", "book"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
