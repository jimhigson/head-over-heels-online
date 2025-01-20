import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "bookworld",
  id: "bookworld10",
  items: {
    "door@0,3,1": {
      config: { direction: "right", toRoom: "bookworld11" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "door@6,3,1": {
      config: { direction: "left", toRoom: "bookworld9" },
      position: { x: 6, y: 3, z: 1 },
      type: "door",
    },
    "monster@2,4,0": {
      config: {
        activated: true,
        movement: "towards-on-shortest-axis-xy4",
        which: "monkey",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "monster",
    },
  },
  planet: "bookworld",
  size: { x: 6, y: 8 },
  walls: {
    away: ["book", "cowboy", "book", "book", "cowboy", "book"],
    left: ["book", "book", "cowboy", "none", "none", "cowboy", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
