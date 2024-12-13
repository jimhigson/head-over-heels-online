import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld40",
  items: {
    "door@3,8,0:Zv2OMd": {
      config: { direction: "away", toRoom: "bookworld41crown" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "lift@0,0,0:ZTwqnv": {
      config: { bottom: 0, top: 11 },
      position: { x: 0, y: 0, z: 0 },
      type: "lift",
    },
  },
  planet: "bookworld",
  roomAbove: "bookworld39",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "person", "none", "none", "person", "book", "book"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
