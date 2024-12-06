import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld25",
  items: {
    "door@0,0,0:286uzt": {
      config: { direction: "right", toRoom: "bookworld26" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,0:Z1lPLNa": {
      config: { direction: "left", toRoom: "bookworld24" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 2 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["none", "none"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
