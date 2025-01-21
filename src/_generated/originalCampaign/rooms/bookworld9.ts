import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  id: "bookworld9",
  items: {
    "door@0,1,0": {
      config: { direction: "right", toRoom: "bookworld10" },
      position: { x: 0, y: 1, z: 0 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "bookworld21" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@8,1,0": {
      config: { direction: "left", toRoom: "bookworld8" },
      position: { x: 8, y: 1, z: 0 },
      type: "door",
    },
    "slidingBlock@3,2,0": {
      config: { style: "book" },
      position: { x: 3, y: 2, z: 0 },
      type: "slidingBlock",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 4 },
  walls: {
    away: ["book", "book", "cowboy", "book", "book", "cowboy", "book", "book"],
    left: ["book", "none", "none", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
