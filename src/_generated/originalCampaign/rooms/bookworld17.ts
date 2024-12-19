import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  id: "bookworld17",
  items: {
    "baddie@0,3,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 0, y: 3, z: 0 },
      type: "baddie",
    },
    "baddie@3,2,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 3, y: 2, z: 0 },
      type: "baddie",
    },
    "door@8,2,4:Z1lPTi2": {
      config: { direction: "left", toRoom: "bookworld16" },
      position: { x: 8, y: 2, z: 4 },
      type: "door",
    },
    "spring@2,2,0:13y": {
      config: {},
      position: { x: 2, y: 2, z: 0 },
      type: "spring",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 6 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["book", "book", "none", "none", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
