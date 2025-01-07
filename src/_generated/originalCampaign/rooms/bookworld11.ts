import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "bookworld",
  id: "bookworld11",
  items: {
    "door@0,0,0": {
      config: { direction: "right", toRoom: "bookworld6" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,4": {
      config: { direction: "left", toRoom: "bookworld10" },
      position: { x: 8, y: 0, z: 4 },
      type: "door",
    },
    "hushPuppy@5,1,0": {
      config: {},
      position: { x: 5, y: 1, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@6,1,1": {
      config: {},
      position: { x: 6, y: 1, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@7,1,2": {
      config: {},
      position: { x: 7, y: 1, z: 2 },
      type: "hushPuppy",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 2 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["none", "none"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
