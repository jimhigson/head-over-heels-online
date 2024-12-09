import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld7",
  items: {
    "door@1,0,4:1OwmQD": {
      config: { direction: "towards", toRoom: "bookworld8" },
      position: { x: 1, y: 0, z: 4 },
      type: "door",
    },
    "door@1,8,0:Z2k1nOR": {
      config: { direction: "away", toRoom: "bookworld1" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    "hushPuppy@0,0,0:13y": {
      config: {},
      position: { x: 0, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@1,0,1:13y": {
      config: {},
      position: { x: 1, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@2,0,2:13y": {
      config: {},
      position: { x: 2, y: 0, z: 2 },
      type: "hushPuppy",
    },
  },
  planet: "bookworld",
  size: { x: 4, y: 8 },
  walls: {
    away: ["book", "none", "none", "book"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
