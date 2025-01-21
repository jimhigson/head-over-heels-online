import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "bookworld",
  id: "bookworld3",
  items: {
    "door@0,2,2": {
      config: { direction: "right", toRoom: "bookworld4" },
      position: { x: 0, y: 2, z: 2 },
      type: "door",
    },
    "door@8,2,0": {
      config: { direction: "left", toRoom: "bookworld2" },
      position: { x: 8, y: 2, z: 0 },
      type: "door",
    },
    "monster@3,5,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy4",
        which: "monkey",
      },
      position: { x: 3, y: 5, z: 0 },
      type: "monster",
    },
    "monster@4,0,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy4",
        which: "monkey",
      },
      position: { x: 4, y: 0, z: 0 },
      type: "monster",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 6 },
  walls: {
    away: ["book", "book", "cowboy", "book", "book", "cowboy", "book", "book"],
    left: ["book", "book", "none", "none", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
