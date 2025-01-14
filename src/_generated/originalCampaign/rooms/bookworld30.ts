import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "bookworld",
  id: "bookworld30",
  items: {
    "door@0,1,2": {
      config: { direction: "right", toRoom: "bookworld31" },
      position: { x: 0, y: 1, z: 2 },
      type: "door",
    },
    "door@8,1,2": {
      config: { direction: "left", toRoom: "bookworld29" },
      position: { x: 8, y: 1, z: 2 },
      type: "door",
    },
    "monster@3,2,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 2, z: 0 },
      type: "monster",
    },
    "monster@4,1,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 4, y: 1, z: 0 },
      type: "monster",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 4 },
  walls: {
    away: ["book", "book", "cowboy", "book", "book", "cowboy", "book", "book"],
    left: ["book", "none", "none", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
