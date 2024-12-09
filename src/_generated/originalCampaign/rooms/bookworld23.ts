import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "cyan", shade: "dimmed" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld23",
  items: {
    "door@0,2,0:286u3X": {
      config: { direction: "right", toRoom: "bookworld24" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@2,0,0:JfjoU": {
      config: { direction: "towards", toRoom: "bookworld27" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "door@6,2,5:Z1lPMjF": {
      config: { direction: "left", toRoom: "bookworld22" },
      position: { x: 6, y: 2, z: 5 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 6, y: 6 },
  walls: {
    away: ["book", "person", "book", "book", "person", "book"],
    left: ["book", "book", "none", "none", "book", "book"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
