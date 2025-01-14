import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "bookworld",
  id: "bookworld27",
  items: {
    "block@0,0,0": {
      config: { style: "book" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,0,1": {
      config: { style: "book" },
      position: { x: 0, y: 0, z: 1 },
      type: "block",
    },
    "block@0,0,3": {
      config: { style: "book" },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    "door@0,0,4": {
      config: { direction: "towards", toRoom: "bookworld28" },
      position: { x: 0, y: 0, z: 4 },
      type: "door",
    },
    "door@0,8,0": {
      config: { direction: "away", toRoom: "bookworld23" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
    left: ["book", "book", "cowboy", "book", "book", "cowboy", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
