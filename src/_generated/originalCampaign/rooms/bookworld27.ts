import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld27",
  items: {
    "book@0,0,0:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 0, z: 0 },
      type: "book",
    },
    "book@0,0,1:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 0, z: 1 },
      type: "book",
    },
    "book@0,0,3:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 0, z: 3 },
      type: "book",
    },
    "door@0,0,4:JfjEF": {
      config: { direction: "towards", toRoom: "bookworld28" },
      position: { x: 0, y: 0, z: 4 },
      type: "door",
    },
    "door@0,8,0:ZXTSHQ": {
      config: { direction: "away", toRoom: "bookworld23" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
