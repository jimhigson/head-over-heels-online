import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "deadly",
  floorSkip: [],
  id: "bookworld15",
  items: {
    "book@0,0,0:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 0, z: 0 },
      type: "book",
    },
    "book@0,3,0:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 3, z: 0 },
      type: "book",
    },
    "book@0,7,0:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 7, z: 0 },
      type: "book",
    },
    "book@3,7,0:Z213BvY": {
      config: { slider: false },
      position: { x: 3, y: 7, z: 0 },
      type: "book",
    },
    "book@4,0,0:Z213BvY": {
      config: { slider: false },
      position: { x: 4, y: 0, z: 0 },
      type: "book",
    },
    "door@3,0,1:Jfb8M": {
      config: { direction: "towards", toRoom: "bookworld16" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    "door@3,8,3:ZXU1st": {
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
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
