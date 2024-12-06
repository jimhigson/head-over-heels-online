import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld16",
  items: {
    "door@0,3,0:286mOQ": {
      config: { direction: "right", toRoom: "bookworld17" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@1,0,0:JfbEi": {
      config: { direction: "towards", toRoom: "bookworld18" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0:ZXU1cI": {
      config: { direction: "away", toRoom: "bookworld15" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 4, y: 8 },
  walls: {
    away: ["book", "none", "none", "book"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
