import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "bookworld",
  id: "bookworld3",
  items: {
    "baddie@3,5,0:Z1ubuHg": {
      config: { activated: true, which: "monkey" },
      position: { x: 3, y: 5, z: 0 },
      type: "baddie",
    },
    "baddie@4,0,0:Z1ubuHg": {
      config: { activated: true, which: "monkey" },
      position: { x: 4, y: 0, z: 0 },
      type: "baddie",
    },
    "door@0,2,2:ocN9q": {
      config: { direction: "right", toRoom: "bookworld4" },
      position: { x: 0, y: 2, z: 2 },
      type: "door",
    },
    "door@8,2,0:1AnSiB": {
      config: { direction: "left", toRoom: "bookworld2" },
      position: { x: 8, y: 2, z: 0 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 6 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["book", "book", "none", "none", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
