import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld20",
  items: {
    "door@2,0,4:JfqD2": {
      config: { direction: "towards", toRoom: "bookworld34" },
      position: { x: 2, y: 0, z: 4 },
      type: "door",
    },
    "door@2,6,0:ZXU0aH": {
      config: { direction: "away", toRoom: "bookworld19" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    "door@6,2,0:Z1lPLhE": {
      config: { direction: "left", toRoom: "bookworld26" },
      position: { x: 6, y: 2, z: 0 },
      type: "door",
    },
    "hushPuppy@1,0,0:13y": {
      config: {},
      position: { x: 1, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@2,0,1:13y": {
      config: {},
      position: { x: 2, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@3,0,2:13y": {
      config: {},
      position: { x: 3, y: 0, z: 2 },
      type: "hushPuppy",
    },
  },
  planet: "bookworld",
  size: { x: 6, y: 6 },
  walls: {
    away: ["book", "book", "none", "none", "book", "book"],
    left: ["book", "book", "none", "none", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
