import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld9",
  items: {
    "book@3,2,0:1g3d60": {
      config: { slider: true },
      position: { x: 3, y: 2, z: 0 },
      type: "book",
    },
    "door@0,1,0:286l1z": {
      config: { direction: "right", toRoom: "bookworld10" },
      position: { x: 0, y: 1, z: 0 },
      type: "door",
    },
    "door@3,0,0:JfhQo": {
      config: { direction: "towards", toRoom: "bookworld21" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@8,1,0:1AnTQ8": {
      config: { direction: "left", toRoom: "bookworld8" },
      position: { x: 8, y: 1, z: 0 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 4 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["book", "none", "none", "book"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
