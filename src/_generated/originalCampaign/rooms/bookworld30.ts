import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "bookworld",
  id: "bookworld30",
  items: {
    "baddie@3,2,0:Z2awALk": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 2, z: 0 },
      type: "baddie",
    },
    "baddie@4,1,0:Z2awALk": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 4, y: 1, z: 0 },
      type: "baddie",
    },
    "door@0,1,2:286Bi5": {
      config: { direction: "right", toRoom: "bookworld31" },
      position: { x: 0, y: 1, z: 2 },
      type: "door",
    },
    "door@8,1,2:Z1lPKvo": {
      config: { direction: "left", toRoom: "bookworld29" },
      position: { x: 8, y: 1, z: 2 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 4 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["book", "none", "none", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
