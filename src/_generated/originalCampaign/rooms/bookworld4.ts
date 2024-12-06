import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld4",
  items: {
    "book@0,7,0:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 7, z: 0 },
      type: "book",
    },
    "book@0,7,1:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 7, z: 1 },
      type: "book",
    },
    "door@0,0,0:1Owm5n": {
      config: { direction: "towards", toRoom: "bookworld5" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,4:Z1VM3e8": {
      config: { direction: "away", toRoom: "bookworld12fish" },
      position: { x: 0, y: 8, z: 4 },
      type: "door",
    },
    "door@2,3,4:1AnSym": {
      config: { direction: "left", toRoom: "bookworld3" },
      position: { x: 2, y: 3, z: 4 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
    left: ["book", "book", "person", "none", "none", "person", "book", "book"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
