import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  id: "bookworld17",
  items: {
    "door@8,2,4": {
      config: { direction: "left", toRoom: "bookworld16" },
      position: { x: 8, y: 2, z: 4 },
      type: "door",
    },
    "monster@0,3,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 0, y: 3, z: 0 },
      type: "monster",
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
    "spring@2,2,0": {
      config: {},
      position: { x: 2, y: 2, z: 0 },
      type: "spring",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 6 },
  walls: {
    away: ["book", "book", "cowboy", "book", "book", "cowboy", "book", "book"],
    left: ["book", "book", "none", "none", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
