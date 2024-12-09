import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld10",
  items: {
    "baddie@2,4,0:Z1ubuHg": {
      config: { activated: true, which: "monkey" },
      position: { x: 2, y: 4, z: 0 },
      type: "baddie",
    },
    "door@0,3,1:286lhk": {
      config: { direction: "right", toRoom: "bookworld11" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "door@6,3,1:1AnU6S": {
      config: { direction: "left", toRoom: "bookworld9" },
      position: { x: 6, y: 3, z: 1 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 6, y: 8 },
  walls: {
    away: ["book", "person", "book", "book", "person", "book"],
    left: ["book", "book", "person", "none", "none", "person", "book", "book"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
